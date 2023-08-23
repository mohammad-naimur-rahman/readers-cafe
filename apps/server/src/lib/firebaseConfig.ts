import admin, { type ServiceAccount } from 'firebase-admin'
import { env } from '../utils/env'

const serviceAccount = {
  type: env.FIREBASE_ADMIN_TYPE,
  project_id: env.FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: env.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: env.FIREBASE_ADMIN_AUTH_URI,
  token_uri: env.FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
  universe_domain: env.FIREBASE_ADMIN_UNIVERSE_DOMAIN,
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
})

export default admin
