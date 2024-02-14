import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getGames = async (page: number = 1, pageSize: number = 20) => {
  const games = await prisma.game.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize
  })
  return games
}

export default getGames
