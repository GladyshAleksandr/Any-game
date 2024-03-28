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
      controller: create,
      middlewares: [sessionMiddleware]
    }
  })
}

const create = async (req: NextApiRequest & ExtendRequestSession, res: NextApiResponse) => {
  const gameId = req.body.gameId
  const comment = req.body.comment
  const repliedToId = req.body.repliedToId

  const userId = req.session.user.id

  try {
    if (repliedToId) {
      const createdReply = await prisma.comment.create({
        data: {
          gameId: gameId,
          userId: userId,
          content: comment,
          repliedToId: repliedToId
        },
        include: {
          user: true,
          commentActions: true,
          replies: true
        }
      })
      return res.status(200).json({ ...createdReply })
    }

    const createdComment = await prisma.comment.create({
      data: {
        gameId: gameId,
        userId: userId,
        content: comment
      },
      include: {
        user: true,
        commentActions: true,
        replies: true
      }
    })
    return res.status(200).json({ ...createdComment })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
