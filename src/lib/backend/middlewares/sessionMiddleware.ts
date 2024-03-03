import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'

type UserFromMiddleware = {
  user: {
    id: number
    username: string
    email: string
    name: string | null
  } | null
}

export const sessionMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const token = req.cookies.jwtToken

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number }

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, username: true, email: true, name: true }
      })

      ;(req as UserFromMiddleware & NextApiRequest).user = user
    } else {
      const session = await getSession({ req })

      if (!session || !session.user?.email) return res.redirect('/auth/login')

      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, username: true, email: true, name: true }
      })

      ;(req as UserFromMiddleware & NextApiRequest).user = user
    }

    next()
  } catch (error) {
    console.error('Error authenticating user:', error)
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
