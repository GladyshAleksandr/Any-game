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
    patchRoute: {
      controller: patchUserAction,
      middlewares: [sessionMiddleware]
    }
  })
}

async function patchUserAction(req: NextApiRequest & ExtendRequestSession, res: NextApiResponse) {
  const { data } = req.body.data
  const userId = req.session.user.id

  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data
  })

  res.status(200).json({ ...updatedUser })

  try {
  } catch (error) {}
}
