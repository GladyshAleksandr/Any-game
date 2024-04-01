import getGamesByCriteria from '@/lib/backend/utils/getGamesByCriteria'
import { withRouter } from '@/lib/backend/withRouter'
import { GameCriteria } from '@/lib/ui/api-client/home'
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
  const type = req.query.type as unknown as GameCriteria
  const slug = String(req.query.slug)

  try {
    const games = await getGamesByCriteria(page, type, slug)

    return res.status(200).json({ games })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
