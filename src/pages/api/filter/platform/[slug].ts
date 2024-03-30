import { withRouter } from '@/lib/backend/withRouter'
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await withRouter({
    req,
    res,
    getRoute: {
      controller: GamesByPlatform
    }
  })
}

const GamesByPlatform = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = String(req.query.slug)

  try {
    const games = await prisma.parentPlatform.findUnique({
      where: {
        slug: slug
      },

      select: {
        games: {
          take: 20
        }
      }
    })

    return res.status(200).json({ games })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
