import 'dotenv/config'

function readRequiredEnv(name) {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export function getFirebaseConfig() {
  return {
    apiKey: readRequiredEnv('FIREBASE_API_KEY'),
    authDomain: 'presidentielles-f0682.firebaseapp.com',
    projectId: 'presidentielles-f0682',
    storageBucket: 'presidentielles-f0682.firebasestorage.app',
    messagingSenderId: '171363522127',
    appId: '1:171363522127:web:4225ffc2fb1ac427807c3a',
    measurementId: 'G-1V4MQDR9VX',
  }
}
