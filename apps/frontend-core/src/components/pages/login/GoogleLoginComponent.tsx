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
import GoogleIcon from './GoogleIcon'
import SpinnerIcon from './SpinnerIcon'

interface Props {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function GoogleLoginComponent({
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
          `${env.NEXT_PUBLIC_apiUrl}/auth/login`,
          { email: user.email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (result?.data?.success) {
          setIsLoading(false)
          toast.success('Logged in successfully!')
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
      onClick={handleGoogleLogin}
    >
      {isLoading ? <SpinnerIcon /> : <GoogleIcon />}
    </Button>
  )
}
