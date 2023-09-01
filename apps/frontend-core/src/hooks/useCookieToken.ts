import { getCookie } from 'cookies-next'
import { IToken } from 'validation/types'

export const useCookieToken = (): IToken => {
  const accessToken = getCookie('accessToken')
  const refreshToken = getCookie('refreshToken')
  return {
    accessToken,
    refreshToken,
  }
}
