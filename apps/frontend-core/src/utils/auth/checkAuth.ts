import { getCookie } from 'cookies-next'

// eslint-disable-next-line consistent-return
export function checkAuth(ctx) {
  const { req, res } = ctx
  const token = getCookie('accessToken', { req, res })
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: `/login?redirected=true&prevPath=${req.url}`,
      },
    }
  }
}
