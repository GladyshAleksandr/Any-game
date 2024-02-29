import { Session } from 'next-auth'
import { AuthSession } from '../middlewares/sessionMiddleware'
import prisma from '@/lib/prisma'

export const userFromSession = async (session: Session): Promise<UserFromSession | null> => {
  const userId = (session as unknown as AuthSession)?.user?.id

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      profileImage: true
    }
  })

  if (!user) return null

  return user
}

type UserFromSession = {
  id: number
  username: string
  email: string
  profileImage: string | null
}
