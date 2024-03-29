import { CommentExtended } from '@/types/types'
import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import CommentAPI from '@/lib/ui/api-client/comment'
import Comment from './Comment'

type ComponentProps = {
  gameId: number
  comments: CommentExtended[]
  userId: number | undefined
  setComments: Dispatch<SetStateAction<CommentExtended[]>>
}

const Comments = ({ gameId, comments, userId, setComments }: ComponentProps) => {
  const router = useRouter()

  const removeLikeOrDislike = async (commentId: number) => {
    const res = await CommentAPI.action(commentId, null)

    setComments((prevState) =>
      prevState.map((comment) =>
        comment.id === res.data.commentId
          ? {
              ...comment,
              commentActions: comment.commentActions.filter((el) => el.id !== res.data.id)
            }
          : comment
      )
    )
  }

  const giveLikeOrDislike = async (commentId: number, isLike: boolean) => {
    const res = await CommentAPI.action(commentId, isLike)

    setComments((prevState) =>
      prevState.map((comment) =>
        comment.id === res.data.commentId
          ? {
              ...comment,
              commentActions: [
                ...comment.commentActions.filter((el) => el.id !== res.data.id),
                res.data
              ]
            }
          : comment
      )
    )
  }

  const handleLikeOrDislike = async (commentId: number, isLike: boolean) => {
    if (!userId) router.push('/auth/login')

    const foundComment = comments.find((comment) =>
      comment.commentActions.some(
        (el) => el.commentId === commentId && el.userId === userId && el.isLike === isLike
      )
    )

    try {
      if (foundComment) {
        await removeLikeOrDislike(commentId)
        return
      }
      await giveLikeOrDislike(commentId, isLike)
    } catch (error) {}
  }

  const mainComments = comments.filter((comment) => !comment.repliedToId)
  const replies = comments.filter((comment) => comment.repliedToId)

  return (
    <div>
      {mainComments.map((comment) => (
        <div key={comment.id}>
          <Comment
            comment={comment}
            gameId={gameId}
            userId={userId}
            handleLikeOrDislike={handleLikeOrDislike}
            setComments={setComments}
          />
          <div className="ml-16">
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                gameId={gameId}
                userId={userId}
                handleLikeOrDislike={handleLikeOrDislike}
                setComments={setComments}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comments
