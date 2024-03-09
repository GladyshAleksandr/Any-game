import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { userFromSessionOrJWT } from '../repositories/user.repository'
import prisma from '@/lib/prisma'

const isAuth = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context)
  const user = await userFromSessionOrJWT(context)

  if (!user && context.req.cookies.jwtToken) return false

  if (!user && session)
    await prisma.user.create({
      data: {
        email: session.user?.email || '',
        username: (session.user?.name || '').toLowerCase().replace(/\s+/g, '_'),
        name: session.user?.name,
        profileImage: session.user?.image
      }
    })

  return true
}

export default isAuth
