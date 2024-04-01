import { PAGE_SIZE } from '@/constants'
import prisma from '@/lib/prisma'
import { GameCriteria } from '@/lib/ui/api-client/home'

const getGamesByCriteria = async (page: number = 1, modelType?: GameCriteria, slug?: string) => {
  if (modelType) {
    const games = await (prisma[modelType as keyof typeof prisma] as any).findUnique({
      where: { slug: slug },
      select: {
        games: {
          skip: (page - 1) * PAGE_SIZE,
          take: PAGE_SIZE,
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
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
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
