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
      controller: edit,
      middlewares: [sessionMiddleware]
    },
    deleteRoute: {
      controller: remove,
      middlewares: [sessionMiddleware]
    }
  })
}

const edit = async (req: NextApiRequest & ExtendRequestSession, res: NextApiResponse) => {
  const id = Number(req.query.id)
  const comment = req.body.comment

  try {
    const editedComment = await prisma.comment.update({
      where: {
        id: id
      },
      data: {
        content: comment
      }
    })
    return res.status(200).json({ ...editedComment })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

const remove = async (req: NextApiRequest & ExtendRequestSession, res: NextApiResponse) => {
  const id = Number(req.query.id)

  try {
    const ids = await deleteCommentAndReplies(id)

    return res.status(200).json({ ids })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

async function deleteCommentAndReplies(commentId: number, deletedIds: number[] = []) {
  await prisma.commentAction.deleteMany({
    where: {
      commentId
    }
  })

  const replies = await prisma.comment.findMany({
    where: {
      repliedToId: commentId
    }
  })

  await Promise.all(replies.map((reply) => deleteCommentAndReplies(reply.id, deletedIds)))

  const deletedComment = await prisma.comment.delete({
    where: {
      id: commentId
    }
  })

  deletedIds.push(deletedComment.id)

  return deletedIds
}
