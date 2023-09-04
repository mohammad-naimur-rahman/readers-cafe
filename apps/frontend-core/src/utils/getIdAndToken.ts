import { getCookie } from 'cookies-next'

export const getIdAndToken = (): { id: string; token: string } => {
  const accessToken = getCookie('accessToken')
  const user = getCookie('userData')
  const userData = user && JSON.parse(user)
  return {
    id: userData?._id,
    token: accessToken,
  }
}
