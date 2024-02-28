import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

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

export const sessionMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, email: true, name: true }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    ;(req as ExtendRequestSession & NextApiRequest).session.user = user

    next()
  } catch (error) {
    console.error('Error authenticating user:', error)
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
