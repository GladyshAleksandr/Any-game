import { Game } from '@prisma/client'

export type GameExtended = Game & {
  esrbRating: EsrbRating
  parentPlatforms: ParentPlatform[]
  genres: Genre[]
  tags: Tag[]
}
