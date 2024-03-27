import {
  ExtendRequestSession,
  sessionMiddleware
} from '@/lib/backend/middlewares/sessionMiddleware'
import { withRouter } from '@/lib/backend/withRouter'
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest & ExtendRequestSession,
  res: NextApiResponse
) {
  await withRouter({
    req,
    res,
    postRoute: {
      controller: Action,
      middlewares: [sessionMiddleware]
    }
  })
}

const Action = async (req: NextApiRequest & ExtendRequestSession, res: NextApiResponse) => {
  const isLike = req.body.isLike
  const id = Number(req.query.id)
  const userId = req.session.user.id

  try {
    const like = await prisma.commentAction.upsert({
      where: {
        userId_commentId: { userId: userId, commentId: id }
      },
      update: {
        isLike: isLike
      },

      create: {
        userId: userId,
        commentId: id,
        isLike: isLike
      }
    })
    return res.status(200).json({ ...like })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
