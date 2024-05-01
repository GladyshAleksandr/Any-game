import prisma from '@/lib/prisma'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import jwt from 'jsonwebtoken'

export const userFromSessionOrJWT = async (
  context: GetServerSidePropsContext
): Promise<SessionJwtUserType | null> => {
  const select = { id: true, username: true, email: true, name: true, profileImage: true }

  const session = await getSession(context)
  console.log('session form userFromSesJwt', session)
  const email = session?.user?.email
  const token = context.req.cookies.jwtToken || context.req.headers.authorization?.split(' ')[1]

  let user = null

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number }

    user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select
    })
  } else if (email) {
    user = await prisma.user.findUnique({
      where: { email: email },
      select
    })
  }

  return user
}

export type SessionJwtUserType = {
  id: number
  username: string
  email: string
  name: string | null
  profileImage: string | null
}
