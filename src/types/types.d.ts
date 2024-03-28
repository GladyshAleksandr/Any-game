import {
  Game,
  EsrbRating,
  ParentPlatform,
  Genre,
  Tag,
  Comment,
  User,
  CommentAction
} from '@prisma/client'

export type CommentExtended = Comment & {
  user: User
  commentActions: CommentAction[]
  replies: CommentExtended[]
}

export type GameExtended = Game & {
  esrbRating: EsrbRating
  parentPlatforms: ParentPlatform[]
  genres: Genre[]
  tags: Tag[]
  comments: CommentExtended[]
}
