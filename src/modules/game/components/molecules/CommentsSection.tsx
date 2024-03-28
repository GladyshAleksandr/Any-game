import CommentInput from '@/modules/game/components/molecules/CommentInput'
import { useState } from 'react'
import { CommentExtended, GameExtended } from '@/types/types'
import Comments from './Comments'

type ComponentProps = {
  gameId: number
  gameComments: CommentExtended[]
  userId: number | undefined
}

const CommentsSection = ({ gameId, gameComments, userId }: ComponentProps) => {
  const [comments, setComments] = useState(gameComments)

  return (
    <div className="mt-20">
      <div>
        <p>{comments?.length} Comments</p>
        <div className="mt-2 border-t-2"></div>
        <CommentInput gameId={gameId} userId={userId} setComments={setComments} />
        <div>
          {!comments.length && (
            <div className="mx-auto mt-8 text-xl font-bold">Be the first to live a comment!</div>
          )}
          <Comments gameId={gameId} comments={comments} userId={userId} setComments={setComments} />
        </div>
      </div>
    </div>
  )
}

export default CommentsSection
