import { Button } from '@/components/ui/button'
import { env } from '@/configs/env'
import auth from '@/lib/firebaseConfig'
import { manageUserData } from '@/utils/auth/manageUserData'
import axios from 'axios'
import {
  GoogleAuthProvider,
  UserCredential,
  signInWithPopup,
} from 'firebase/auth'
import { toast } from 'react-hot-toast'
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
          `${env.NEXT_PUBLIC_apiUrl}/auth/login`,
          { email: user.email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (result?.data?.success) {
          toast.success('Logged in successfully!')
          const authData: IAuthUser = result?.data?.data
          manageUserData(authData)
        }
      }
    } catch (err) {
      toast.error(err.message)
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
