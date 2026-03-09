import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { signInWithGoogle, signOutUser, subscribeToAuthState } from '../../../services/authService'
import { upsertUserProfile } from '../../../services/userProfileRepository'
import { getAuthErrorMessage } from '../utils/authErrors'

type ProfileSyncStatus = 'idle' | 'syncing' | 'synced' | 'error'

interface UseAuthSessionResult {
  user: User | null
  isLoading: boolean
  isSigningIn: boolean
  authError: string | null
  profileSyncStatus: ProfileSyncStatus
  profileSyncError: string | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

function getProfileSyncErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    if (error.code === 'permission-denied') {
      return 'Connexion active, mais Firestore refuse l’écriture du profil utilisateur.'
    }
  }

  return 'Connexion active, mais la synchronisation du profil dans Firestore a échoué.'
}

export function useAuthSession(): UseAuthSessionResult {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [profileSyncStatus, setProfileSyncStatus] = useState<ProfileSyncStatus>('idle')
  const [profileSyncError, setProfileSyncError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const unsubscribe = subscribeToAuthState((nextUser) => {
      setUser(nextUser)
      setIsLoading(false)

      if (!nextUser?.email) {
        if (active) {
          setProfileSyncStatus('idle')
          setProfileSyncError(null)
        }
        return
      }

      if (active) {
        setProfileSyncStatus('syncing')
        setProfileSyncError(null)
      }

      void upsertUserProfile(nextUser.uid, {
        displayName: nextUser.displayName ?? 'Utilisateur presidentielles',
        email: nextUser.email,
        photoUrl: nextUser.photoURL ?? null,
        providerId: nextUser.providerData[0]?.providerId ?? 'google.com',
      })
        .then(() => {
          if (!active) {
            return
          }

          setProfileSyncStatus('synced')
        })
        .catch((error) => {
          if (!active) {
            return
          }

          console.error('Failed to sync user profile to Firestore', error)
          setProfileSyncStatus('error')
          setProfileSyncError(getProfileSyncErrorMessage(error))
        })
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  const signIn = async (): Promise<void> => {
    setAuthError(null)
    setIsSigningIn(true)

    try {
      await signInWithGoogle()
    } catch (error) {
      setAuthError(getAuthErrorMessage(error))
    } finally {
      setIsSigningIn(false)
    }
  }

  const signOut = async (): Promise<void> => {
    setAuthError(null)

    try {
      await signOutUser()
    } catch {
      setAuthError('Déconnexion impossible pour le moment.')
    }
  }

  return {
    user,
    isLoading,
    isSigningIn,
    authError,
    profileSyncStatus,
    profileSyncError,
    signIn,
    signOut,
  }
}
