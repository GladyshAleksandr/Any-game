import { PAGE_SIZE } from '@/constants'
import prisma from '@/lib/prisma'
import { GameCriteria } from '@/lib/ui/api-client/home'

const getGamesByCriteria = async (page: number = 1, type?: GameCriteria, value?: string) => {
  if (type === GameCriteria.name) {
    const games = await prisma.game.findMany({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        esrbRating: true,
        parentPlatforms: true,
        genres: true,
        tags: true
      },
      where: {
        name: {
          contains: value,
          mode: 'insensitive'
        }
      }
    })

    return games
  }
  if (type) {
    const games = await (prisma[type as keyof typeof prisma] as any).findUnique({
      where: { slug: value },
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
