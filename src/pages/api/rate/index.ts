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
      controller: rateGame,
      middlewares: [sessionMiddleware]
    }
  })
}

const rateGame = async (req: NextApiRequest & ExtendRequestSession, res: NextApiResponse) => {
  const rating = Number(req.body.rating)
  const gameId = Number(req.body.gameId)

  const userId = req.session.user.id

  try {
    const ratingRaw = await prisma.rating.upsert({
      where: {
        userId_gameId: {
          userId: userId,
          gameId: gameId
        }
      },
      update: {
        rating: rating
      },
      create: {
        userId: userId,
        gameId: gameId,
        rating: rating
      }
    })

    return res.status(200).json({ ratingRaw })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
