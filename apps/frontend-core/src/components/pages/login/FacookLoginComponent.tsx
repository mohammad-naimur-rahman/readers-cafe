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
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-hot-toast'
import { IAuthUser } from 'validation/types'
import FacebookIcon from '../../ui/icons/FacebookIcon'
import SpinnerIcon from '../../ui/icons/SpinnerIcon'

interface Props {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  query: {
    redirected?: boolean
    prevPath?: string
  }
}

export default function FacookLoginComponent({
  isLoading,
  setIsLoading,
  query,
}: Props) {
  const { push } = useRouter()
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
          if (query?.redirected) {
            push(query?.prevPath)
          } else {
            push('/')
          }
        }
      }
    } catch (err) {
      setIsLoading(false)
      toast.error(err?.response?.data?.message)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="block w-full"
      disabled={isLoading}
      onClick={handleFacebookLogin}
    >
      {isLoading ? <SpinnerIcon /> : <FacebookIcon />}
    </Button>
  )
}
