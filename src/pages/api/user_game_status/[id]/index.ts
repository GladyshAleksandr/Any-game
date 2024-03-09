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
  const id = Number(req.query.id)
  const { status } = req.body
  try {
    const updatedUserGameStatus = await prisma.userGameStatus.update({
      where: { id },
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
  const id = Number(req.query.id)
  try {
    const deletedUserGameStatus = await prisma.userGameStatus.delete({
      where: { id }
    })
    return res.status(200).json({ deletedUserGameStatus })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
