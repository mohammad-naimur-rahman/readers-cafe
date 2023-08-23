import { env } from '@/configs/env'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_apiKey,
  authDomain: env.NEXT_PUBLIC_authDomain,
  projectId: env.NEXT_PUBLIC_projectId,
  storageBucket: env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: env.NEXT_PUBLIC_measurementId,
  appId: env.NEXT_PUBLIC_appId,
  measurementId: env.NEXT_PUBLIC_measurementId,
}
const app: FirebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(app)

export default auth
