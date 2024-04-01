import prisma from '@/lib/prisma'
import { GameCriteria } from '@/lib/ui/api-client/home'

const getGamesByCriteria = async (page: number = 1, modelType?: GameCriteria, slug?: string) => {
  const pageSize = 20

  if (modelType) {
    const games = await prisma[modelType].findUnique({
      where: { slug: slug },
      select: {
        games: {
          skip: (page - 1) * pageSize,
          take: pageSize,
          include: {
            esrbRating: true,
            parentPlatforms: true,
            genres: true,
            tags: true
          }
        }
      }
    })

    return games.games
  }

  const games = await prisma.game.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      esrbRating: true,
      parentPlatforms: true,
      genres: true,
      tags: true
    }
  })

  return games
}

export default getGamesByCriteria
