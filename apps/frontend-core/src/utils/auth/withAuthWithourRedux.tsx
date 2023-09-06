import { getCookie } from 'cookies-next'
import Router from 'next/router'

const login = ctx => {
  return `/login?redirected=true&prevPath=${ctx.asPath}`
}

const checkUserAuthentication = ctx => {
  const { req, res } = ctx
  const jwt = getCookie('accessToken', { req, res })
  return { auth: !!jwt }
}

const withAuthWithourRedux = WrappedComponent => {
  const HocComponent = ({ ...props }) => {
    return <WrappedComponent {...props} />
  }

  HocComponent.getInitialProps = async ctx => {
    const userAuth = await checkUserAuthentication(ctx)

    // Are you an authorized user or not?
    if (!userAuth?.auth) {
      // Handle server-side and client-side rendering.
      if (ctx.res) {
        ctx.res?.writeHead(302, {
          Location: login(ctx),
        })
        ctx.res?.end()
      } else {
        Router.replace(login(ctx))
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...ctx,
        auth: userAuth,
      })
      return { ...wrappedProps, userAuth }
    }

    return { userAuth }
  }

  return HocComponent
}

export default withAuthWithourRedux
