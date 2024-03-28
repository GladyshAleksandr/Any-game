import CommentInput from './CommentInput'
import Like from '@icons/Like.svg'
import Dislike from '@icons/Dislike.svg'
import Dots from '@icons/Dots.svg'
import { CommentExtended } from '@/types/types'
import { Dispatch, SetStateAction, useState } from 'react'
import timeAgo from '@/lib/ui/utils/timeAgo'
import CommentAPI from '@/lib/ui/api-client/comment'

type ComponentProps = {
  gameId: number
  comments: CommentExtended[]
  userId: number | undefined
  setComments: Dispatch<SetStateAction<CommentExtended[]>>
}

const Comments = ({ gameId, comments, userId, setComments }: ComponentProps) => {
  const [repliedToId, setRepliedToId] = useState<number | null>(null)

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

  const handleReplyButton = (commentId: number) => {
    if (repliedToId) setRepliedToId(null)
    else setRepliedToId(commentId)
  }

  return (
    <div className="">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start justify-between mt-4 ">
          <div className="flex space-x-3">
            {comment.user.profileImage ? (
              <img src={comment.user.profileImage} className="rounded-full w-12 h-12"></img>
            ) : (
              <div className="">
                {comment.user.name
                  ? comment.user.name[0].toLocaleUpperCase()
                  : comment.user.username[0].toLocaleUpperCase()}
              </div>
            )}
            <div className="flex flex-col space-y-2 text-xs">
              <p className="font-semibold text-base">
                {comment.user.name || comment.user.username}
              </p>
              <p>{timeAgo(comment.createdAt)}</p>
              <div className="text-base">{comment.content}</div>
              <div className="flex justify-center items-center space-x-4 ">
                <div className="flex justify-center items-center space-x-2">
                  <Like
                    className="w-5 cursor-pointer"
                    onClick={() => handleLikeOrDislike(comment.id, true)}
                  />
                  <p>{comment.commentActions.filter((el) => el.isLike).length}</p>
                </div>
                <div className="flex justify-center items-center space-x-2">
                  <Dislike
                    className="w-5 cursor-pointer"
                    onClick={() => handleLikeOrDislike(comment.id, false)}
                  />
                  <p>{comment.commentActions.filter((el) => !el.isLike).length}</p>
                </div>

                <p className="cursor-pointer" onClick={() => handleReplyButton(comment.id)}>
                  Reply
                </p>
              </div>
              {repliedToId && (
                <CommentInput
                  gameId={gameId}
                  userId={userId}
                  repliedToId={repliedToId}
                  setComments={setComments}
                />
              )}

              <div>
                {comment.replies.map((reply) => (
                  <div></div>
                ))}
              </div>
            </div>
          </div>

          <Dots className="w-6" />
        </div>
      ))}
    </div>
  )
}

export default Comments
