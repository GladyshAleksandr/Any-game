import { ExtendRequestSession } from '@/lib/backend/middlewares/sessionMiddleware'
import { withRouter } from '@/lib/backend/withRouter'
import prisma from '@/lib/prisma'
import { FilterReqData } from '@/lib/ui/api-client/filter'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest & ExtendRequestSession,
  res: NextApiResponse
) {
  await withRouter({
    req,
    res,
    postRoute: {
      controller: GamesByFilter
    }
  })
}

const GamesByFilter = async (req: NextApiRequest & ExtendRequestSession, res: NextApiResponse) => {
  const data = req.body as FilterReqData[]

  try {
    const filteredGames = await prisma.game.findMany({ where: {} })

    return res.status(200).json({})
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
