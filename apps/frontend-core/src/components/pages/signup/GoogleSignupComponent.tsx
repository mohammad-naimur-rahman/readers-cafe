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
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-hot-toast'
import { IAuthUser } from 'validation/types'
import GoogleIcon from '../login/GoogleIcon'
import SpinnerIcon from '../login/SpinnerIcon'

interface Props {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function GoogleSignupComponent({
  isLoading,
  setIsLoading,
}: Props) {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      setIsLoading(true)
      const response: UserCredential = await signInWithPopup(auth, provider)
      const { user } = response
      if (user) {
        const token = await user.getIdToken()
        const result = await axios.post(
          `${env.NEXT_PUBLIC_apiUrl}/auth/signup`,
          { email: user.email, fullName: user.displayName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (result?.data?.success) {
          setIsLoading(false)
          toast.success('Signed up successfully!')
          const authData: IAuthUser = result?.data?.data
          manageUserData(authData)
        }
      }
    } catch (err) {
      setIsLoading(false)
      toast.error(err.message)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="block w-full"
      disabled={isLoading}
      onClick={handleGoogleLogin}
    >
      {isLoading ? <SpinnerIcon /> : <GoogleIcon />}
    </Button>
  )
}
