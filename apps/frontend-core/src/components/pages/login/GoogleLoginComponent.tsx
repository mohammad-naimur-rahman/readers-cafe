import { Button } from '@/components/ui/button'
import auth from '@/lib/firebaseConfig'
import { IToken } from '@/types/IToken'
import { calculateTokenExpiration } from '@/utils/calculateTokenExpiration'
import axios from 'axios'
import {
  GoogleAuthProvider,
  UserCredential,
  signInWithPopup,
} from 'firebase/auth'
import jwtDecode from 'jwt-decode'
import { IAuthUser, IUser } from 'validation/types'
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
        const accessToken = authData?.token?.accessToken
        const refreshToken = authData?.token?.refreshToken
        const accessTokenData: IToken = jwtDecode(accessToken)
        const refreshTokenData: IToken = jwtDecode(refreshToken)
        const userData: IUser = authData?.user
        const userDataToSave = {
          _id: userData?.id,
          email: userData?.email,
          name: userData?.fullName,
          image: userData?.profilePicture,
        }

        const accessTokenExpiration = calculateTokenExpiration(accessTokenData)

        console.log(accessTokenExpiration)

        console.log(accessTokenData, refreshTokenData, userDataToSave)

        // setCookie('user', JSON.stringify(userDataToSave))
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
