import auth from '@/lib/firebaseConfig'
import axios from 'axios'
import {
  GoogleAuthProvider,
  UserCredential,
  signInWithPopup,
} from 'firebase/auth'

export default function IndexPage() {
  const loginWithGoogle = async e => {
    e.preventDefault()
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    provider.setCustomParameters({
      admin: 'true',
    })
    try {
      const response: UserCredential = await signInWithPopup(auth, provider)
      const { user } = response
      if (user) {
        const accessToken = await user.getIdToken()
        const result = await axios.post(
          'http://localhost:5000/api/v1/auth/login',
          { email: user.email },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        console.log(result.data)
      }
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <div>
      <form onSubmit={loginWithGoogle}>
        <button type="submit">Login with google</button>
      </form>
    </div>
  )
}
