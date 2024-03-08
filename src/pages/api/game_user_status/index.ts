import {
  ExtendRequestSession,
  sessionMiddleware
} from '@/lib/backend/middlewares/sessionMiddleware'
import { withRouter } from '@/lib/backend/withRouter'
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest & ExtendRequestSession, res: NextApiResponse) {
  await withRouter({
    req,
    res,
    postRoute: {
      controller: createUserGameStatus,
      middlewares: [sessionMiddleware]
    }
  })
}

const createUserGameStatus = async (
  req: NextApiRequest & ExtendRequestSession,
  res: NextApiResponse
) => {
  const { gameId, status } = req.body
  const userId = req.session.user.id

  try {
    const createdUserGameStatus = await prisma.userGameStatus.create({
      data: {
        gameId,
        userId,
        status
      }
    })
    return res.status(200).json({ createdUserGameStatus })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
