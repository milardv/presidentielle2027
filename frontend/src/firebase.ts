import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDjCugeUjARO7ObrcR4ao4_53rWSHGGYPQ',
  authDomain: 'presidentielles-f0682.firebaseapp.com',
  projectId: 'presidentielles-f0682',
  storageBucket: 'presidentielles-f0682.firebasestorage.app',
  messagingSenderId: '171363522127',
  appId: '1:171363522127:web:4225ffc2fb1ac427807c3a',
  measurementId: 'G-1V4MQDR9VX',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export const googleAuthProvider = new GoogleAuthProvider()

auth.useDeviceLanguage()
googleAuthProvider.setCustomParameters({
  prompt: 'select_account',
})

export let analytics: Analytics | null = null
void isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(firebaseApp)
  }
})
