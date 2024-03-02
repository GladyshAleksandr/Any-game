import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { userFromSessionOrJWT } from '../repositories/user.repository'

const handleOnLoginRedirect = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context)
  const user = await userFromSessionOrJWT(context)

  if (session || context.req.cookies.token) {
    if (user) return { redirect: { permanent: false, destination: '/home' } }
  }
}

export default handleOnLoginRedirect
