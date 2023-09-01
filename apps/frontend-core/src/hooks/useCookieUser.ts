import { initUserData } from '@/constants/initUserData'
import { ICookieUser } from '@/types/ICookieUser'
import { getCookie } from 'cookies-next'

export const useCookieUser = (): ICookieUser => {
  const userData = getCookie('userData')
  const userParsed: ICookieUser = userData ? JSON.parse(userData) : initUserData
  return userParsed
}
