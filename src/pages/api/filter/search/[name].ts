import { withRouter } from '@/lib/backend/withRouter'
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await withRouter({
    req,
    res,
    getRoute: {
      controller: GameByName
    }
  })
}

const GameByName = async (req: NextApiRequest, res: NextApiResponse) => {
  const name = String(req.query.name)

  try {
    const games = await prisma.game.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      },
      take: 20
    })

    return res.status(200).json({ games })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
