import { ExtendRequestSession } from '@/lib/backend/middlewares/sessionMiddleware'
import getGames from '@/lib/backend/utils/getGames'
import { withRouter } from '@/lib/backend/withRouter'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await withRouter({
    req,
    res,
    getRoute: {
      controller: Games
    }
  })
}

const Games = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = Number(req.query.page)

  console.log('Page', page)
  const games = await getGames(page)

  try {
    return res.status(200).json({ games })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
