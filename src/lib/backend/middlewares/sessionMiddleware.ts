import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'
import { NextResponse } from 'next/server'

export interface AuthSession {
  expires: string
  user: {
    id: number
    username: string
    email: string
    name: string | null
  }
}

export interface ExtendRequestSession {
  session: AuthSession
}

export type Middleware<R = {}> = (
  req: NextApiRequest & R,
  res: NextApiResponse,
  next: () => Promise<void>
) => Promise<void | NextApiResponse<any>>

export const sessionMiddleware = async (
  req: NextApiRequest & ExtendRequestSession,
  res: NextApiResponse,
  next: () => void
) => {
  const token = req.cookies.jwtToken

  if (!req.session) {
    req.session = { user: null } as any //If with JWT, session may be null
  }

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number }

      const user = await prisma.user.findUniqueOrThrow({
        where: { id: decoded.userId },
        select: { id: true, username: true, email: true, name: true }
      })
      ;(req as ExtendRequestSession & NextApiRequest).session.user = user
    } else {
      const session = await getSession({ req })
      if (!session || !session.user?.email)
        return res.status(302).json({ message: 'Unauthorized', redirectTo: '/auth/login' })

      const user = await prisma.user.findUniqueOrThrow({
        where: { email: session.user.email },
        select: { id: true, username: true, email: true, name: true }
      })

      ;(req as ExtendRequestSession & NextApiRequest).session.user = user
    }

    next()
  } catch (error) {
    console.error('Error authenticating user:', error)
    return res.status(302).json({ message: 'Unauthorized', redirectTo: '/auth/login' })
  }
}
