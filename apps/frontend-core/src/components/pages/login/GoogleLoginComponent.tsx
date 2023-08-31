import { Button } from '@/components/ui/button'
import auth from '@/lib/firebaseConfig'
import { manageUserData } from '@/utils/auth/manageUserData'
import axios from 'axios'
import {
  GoogleAuthProvider,
  UserCredential,
  signInWithPopup,
} from 'firebase/auth'
import { IAuthUser } from 'validation/types'
import GoogleIcon from './GoogleIcon'

export default function GoogleLoginComponent() {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    provider.setCustomParameters({
      admin: 'true',
    })
    try {
      const response: UserCredential = await signInWithPopup(auth, provider)
      const { user } = response
      if (user) {
        const token = await user.getIdToken()
        const result = await axios.post(
          'http://localhost:5000/api/v1/auth/login',
          { email: user.email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const authData: IAuthUser = result?.data?.data
        manageUserData(authData)
      }
    } catch (err) {
      // console.log(err.response.data)
    }
  }
  return (
    <Button
      type="button"
      variant="outline"
      className="block w-full"
      onClick={handleGoogleLogin}
    >
      <GoogleIcon />
    </Button>
  )
}
