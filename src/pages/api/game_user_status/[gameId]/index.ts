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
      controller: updateUserGameStatus,
      middlewares: [sessionMiddleware]
    },
    deleteRoute: {
      controller: deleteUserGameStatus,
      middlewares: [sessionMiddleware]
    }
  })
}

const updateUserGameStatus = async (req: NextApiRequest, res: NextApiResponse) => {}

const deleteUserGameStatus = async (req: NextApiRequest, res: NextApiResponse) => {}
