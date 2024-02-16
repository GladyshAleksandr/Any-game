import prisma from '@/lib/prisma'

const getGames = async (page: number = 1, pageSize: number = 20) => {
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

export default getGames
