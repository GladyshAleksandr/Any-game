import React, { useState, useRef, Dispatch, SetStateAction } from 'react'
import EmojiPicker from 'emoji-picker-react'
import CommentAPI from '@/lib/ui/api-client/comment'
import { CommentExtended } from '@/types/types'
import { useRouter } from 'next/router'

export enum CommentMode {
  Create,
  Reply,
  Edit
}

type BaseProps = {
  userId: number | undefined
  setComments: Dispatch<SetStateAction<CommentExtended[]>>
}

type CreateProps = {
  mode: CommentMode.Create
  gameId: number
} & BaseProps

type ReplyProps = {
  mode: CommentMode.Reply
  gameId: number
  repliedToId: number
  closeInput: () => void
} & BaseProps

type EditProps = {
  mode: CommentMode.Edit
  commentId: number
  initialComment: string
  closeInput: () => void
} & BaseProps

type ComponentProps = CreateProps | ReplyProps | EditProps

const CommentInput: React.FC<ComponentProps> = (props) => {
  const router = useRouter()

  const [comment, setComment] = useState(
    props.mode === CommentMode.Edit ? props.initialComment : ''
  )
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const textAreaRef = useRef(null)

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiSelect = (el: any) => {
    setComment((prevComment) => prevComment + el.emoji)
    toggleEmojiPicker()
  }

  const handleBoldClick = () => {
    applyTextFormatting('**', '**')
  }

  const handleItalicClick = () => {
    applyTextFormatting('_', '_')
  }

  const handleUnderlineClick = () => {
    applyTextFormatting('__', '__')
  }

  const handleLinkClick = () => {
    applyTextFormatting('[Link](https://example.com)')
  }

  const handleSubmitComment = async () => {
    try {
      switch (props.mode) {
        case CommentMode.Create:
          const createdComment = await CommentAPI.create(props.gameId, comment)
          props.setComments((prevState) => [createdComment.data, ...prevState])
          break

        case CommentMode.Reply:
          const createdResponse = await CommentAPI.create(props.gameId, comment, props.repliedToId)
          props.setComments((prevState) => [...prevState, createdResponse.data])

          props.closeInput()
          break

        case CommentMode.Edit:
          const editedComment = await CommentAPI.edit(props.commentId, comment)
          props.setComments((prevState) =>
            prevState.map((comment) =>
              comment.id === editedComment.data.id
                ? { ...comment, content: editedComment.data.content }
                : comment
            )
          )

          props.closeInput()

          break
      }
    } catch (error) {
      console.error(error)
    }
  }

  const applyTextFormatting = (startTag: string, endTag = '') => {
    const textArea = textAreaRef.current as any
    const startPos = textArea.selectionStart
    const endPos = textArea.selectionEnd
    const selectedText = comment.substring(startPos, endPos)
    const formattedText = `${startTag}${selectedText}${endTag}`
    const newComment = comment.substring(0, startPos) + formattedText + comment.substring(endPos)
    setComment(newComment)
    textArea.focus()
    textArea.setSelectionRange(
      startPos + startTag.length,
      startPos + startTag.length + selectedText.length
    )
  }

  const handleInputClick = () => {
    if (!props.userId) router.push('/auth/login')
  }

  return (
    <div className="mt-4 bg-white rounded-lg border ">
      <textarea
        ref={textAreaRef}
        className="w-full h-24 p-4 rounded resize-none border-none outline-none text-black"
        placeholder="Write your comment..."
        value={comment}
        onClick={handleInputClick}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="flex justify-between items-center p-2 border-t-2 border-[#acb2b6] text-[#acb2b6] font-semibold">
        <div className="space-x-2">
          <button className="" onClick={toggleEmojiPicker}>
            😀
          </button>
          <button className="" onClick={handleBoldClick}>
            B
          </button>
          <button className="" onClick={handleItalicClick}>
            <i>I</i>
          </button>
          <button className="" onClick={handleUnderlineClick}>
            U
          </button>
          <button className="" onClick={handleLinkClick}>
            Link
          </button>
        </div>
        <button className="bg-red rounded-full p-2 text-white ml-10" onClick={handleSubmitComment}>
          Comment
        </button>
      </div>

      {showEmojiPicker && (
        <div className="absolute z-10 top-full left-0 rounded-lg">
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </div>
  )
}

export default CommentInput
