import { Button } from '@/components/ui/button'
import { env } from '@/configs/env'
import auth from '@/lib/firebaseConfig'
import { manageUserData } from '@/utils/auth/manageUserData'
import axios from 'axios'
import {
  FacebookAuthProvider,
  UserCredential,
  signInWithPopup,
} from 'firebase/auth'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-hot-toast'
import { IAuthUser } from 'validation/types'
import FacebookIcon from './FacebookIcon'
import SpinnerIcon from './SpinnerIcon'

interface Props {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function FacookLoginComponent({
  isLoading,
  setIsLoading,
}: Props) {
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider()
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
      onClick={handleFacebookLogin}
    >
      {isLoading ? <SpinnerIcon /> : <FacebookIcon />}
    </Button>
  )
}
