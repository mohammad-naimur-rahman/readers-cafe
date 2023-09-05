import { getCookie } from 'cookies-next'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export function requireAuth(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req, res } = ctx

    if (req.headers.cookie) {
      const accessToken = getCookie('accessToken', { req, res })

      if (!accessToken) {
        return {
          redirect: {
            permanent: false,
            destination: `/login?redirected=true&prevPath=${req.url}`,
          },
        }
      }
    }

    return gssp(ctx)
  }
}
