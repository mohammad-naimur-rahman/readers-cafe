import { checkAuth } from './checkAuth'

export function withAuth(getServerSidePropsFunc) {
  return async context => {
    const authResult = checkAuth(context)

    if (authResult) {
      return authResult
    }

    if (getServerSidePropsFunc) {
      return getServerSidePropsFunc(context)
    }

    return {
      props: {},
    }
  }
}
