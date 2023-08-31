import { ICookieUser } from '@/types/ICookieUser'
import { setCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import { IAuthUser, ITokenData, IUser } from 'validation/types'
import { calculateTokenExpiration } from './calculateTokenExpiration'

export const manageUserData = (authData: IAuthUser) => {
  const accessToken = authData?.token?.accessToken
  const refreshToken = authData?.token?.refreshToken

  // Decode jwt token
  const accessTokenData: ITokenData = jwtDecode(accessToken)
  const refreshTokenData: ITokenData = jwtDecode(refreshToken)

  const accessTokenExpiration = calculateTokenExpiration(accessTokenData)
  const refreshTokenExpiration = calculateTokenExpiration(refreshTokenData)

  // Taking only the necessary data
  const userData: IUser = authData?.user
  const userDataToSave: ICookieUser = {
    _id: userData?.id,
    email: userData?.email,
    name: userData?.fullName,
    image: userData?.profilePicture,
  }

  setCookie('accessToken', accessToken, { maxAge: accessTokenExpiration })
  setCookie('refreshToken', refreshToken, { maxAge: refreshTokenExpiration })

  // Saving usee data with refresh token expiration because when refresh token will expire, user needs to login again
  setCookie('userData', JSON.stringify(userDataToSave), {
    maxAge: refreshTokenExpiration,
  })
}
