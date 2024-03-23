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
    patchRoute: {
      controller: updateUserGameStatus,
      middlewares: [sessionMiddleware]
    },
    deleteRoute: {
      controller: deleteUserGameStatus,
      middlewares: [sessionMiddleware]
    }
  })
}

const updateUserGameStatus = async (
  req: NextApiRequest & ExtendRequestSession,
  res: NextApiResponse
) => {
  const { status } = req.body
  const gameId = Number(req.query.gameId)
  const userId = req.session.user.id

  try {
    const updatedUserGameStatus = await prisma.userGameStatus.update({
      where: {
        userId_gameId: {
          userId: userId,
          gameId: gameId
        }
      },

      data: { status }
    })
    return res.status(200).json({ ...updatedUserGameStatus })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

const deleteUserGameStatus = async (
  req: NextApiRequest & ExtendRequestSession,
  res: NextApiResponse
) => {
  const gameId = Number(req.query.gameId)
  const userId = req.session.user.id

  try {
    const deletedUserGameStatus = await prisma.userGameStatus.delete({
      where: {
        userId_gameId: {
          userId: userId,
          gameId: gameId
        }
      }
    })
    return res.status(200).json({ deletedUserGameStatus })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
