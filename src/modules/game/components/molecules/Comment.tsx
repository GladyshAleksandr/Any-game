import timeAgo from '@/lib/ui/utils/timeAgo'
import { CommentExtended } from '@/types/types'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import CommentInput, { CommentMode } from './CommentInput'
import Like from '@icons/Like.svg'
import Dislike from '@icons/Dislike.svg'
import Dots from '@icons/Dots.svg'
import Edit from '@icons/Edit.svg'
import Delete from '@icons/Delete.svg'
import UseClickOutside from '@/lib/ui/utils/useClickOutside'
import CommentAPI from '@/lib/ui/api-client/comment'
import Avatar from 'components/ui/Avatar'
import { useRouter } from 'next/router'

type ComponentProps = {
  comment: CommentExtended
  gameId: number
  userId: number | undefined
  handleLikeOrDislike: (commentId: number, isLike: boolean) => Promise<void>
  setComments: Dispatch<SetStateAction<CommentExtended[]>>
}

const Comment = ({ comment, gameId, userId, handleLikeOrDislike, setComments }: ComponentProps) => {
  const menuRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  const [repliedToId, setRepliedToId] = useState<number | null>(null)
  const [showOptions, setShowOptions] = useState(false)
  const [editComment, setEditComment] = useState(false)

  const handleReplyButton = () => {
    if (!userId) {
      router.push('/auth/login')
      return
    }

    if (repliedToId) setRepliedToId(null)
    else setRepliedToId(comment.id)
  }

  const handleEditButton = () => {
    setEditComment(true)

    setShowOptions(false)
  }

  const handleRemovetButton = async () => {
    setShowOptions(false)
    const res = await CommentAPI.remove(comment.id)

    setComments((prevState) => prevState.filter((comment) => comment.id !== res.data.id))
  }

  UseClickOutside(menuRef, showOptions, () => setShowOptions(false))

  return (
    <div key={comment.id} className="mt-6">
      {!editComment ? (
        <div key={comment.id} className="relative flex items-start justify-between">
          <div className="flex space-x-3">
            <Avatar user={comment.user} />
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

                <p className="cursor-pointer" onClick={handleReplyButton}>
                  Reply
                </p>
              </div>
              {repliedToId && (
                <CommentInput
                  mode={CommentMode.Reply}
                  userId={userId}
                  setComments={setComments}
                  gameId={gameId}
                  repliedToId={repliedToId}
                  closeInput={handleReplyButton}
                />
              )}
            </div>
          </div>

          <div ref={menuRef} className={userId === comment.userId ? '' : 'hidden'}>
            <Dots
              className="w-6 cursor-pointer"
              onClick={() => setShowOptions((prevState) => !prevState)}
            ></Dots>
            {showOptions && (
              <div className="absolute bg-gray w-40 py-4 space-y-2 rounded-xl top-10 right-0 text-sm">
                <div
                  onClick={handleEditButton}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Edit className="w-4 ml-4" />
                  <p>Edit</p>
                </div>
                <div
                  onClick={handleRemovetButton}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Delete className="w-4 ml-4" />
                  <p>Delete</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Avatar user={comment.user} />
          <CommentInput
            mode={CommentMode.Edit}
            userId={userId}
            setComments={setComments}
            commentId={comment.id}
            initialComment={comment.content}
            closeInput={() => setEditComment(false)}
          />
        </div>
      )}
    </div>
  )
}

export default Comment
