import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await generate()
    res.status(200).json({ message: 'Generation completed successfully.' })
  } catch (error) {
    console.error('Generation failed:', error)
    res.status(500).json({ error: 'Generation failed.' })
  }
}

const prisma = new PrismaClient()

type Games = {
  id: number
  name: string
  background_image: string
  slug: string
  short_screenshots: { image: string }[]
  metacritic: number
  rating_top: number
  esrb_rating: {
    id: number
    name: string
    slug: string
  }
  parent_platforms: {
    platform: {
      id: number
      name: string
      slug: string
    }
  }[]
  tags: {
    id: number
    name: string
    slug: string
    image_background: string
  }[]
  genres: {
    id: number
    name: string
    slug: string
    image_background: string
  }[]
}

const esrbRating = [
  {
    id: 1,
    name: 'Everyone',
    slug: 'everyone'
  },
  {
    id: 2,
    name: 'Everyone 10+',
    slug: 'everyone-10-plus'
  },
  {
    id: 3,
    name: 'Teen',
    slug: 'teen'
  },
  {
    id: 4,
    name: 'Mature',
    slug: 'mature'
  },
  {
    id: 5,
    name: 'Adults Only',
    slug: 'adults-only'
  }
]

const generate = async () => {
  try {
    const gamesReq = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`
    )

    const games: Games[] = gamesReq.data.results

    // const createdEsrbRating = await prisma.esrbRating.createMany({ data: esrbRating }) //TODO add condition

    const gameData = games.map((game) => ({
      where: { slug: game.slug },
      create: {
        name: game.name,
        slug: game.slug,
        backgroundImage: game.background_image,
        screenshots: game.short_screenshots.map((screenshot) => screenshot.image),
        metacritic: game.metacritic,
        esrbRatingId: game.esrb_rating.id,

        parentPlatforms: {
          connectOrCreate: game.parent_platforms.map((el) => ({
            where: { slug: el.platform.slug },
            create: {
              name: el.platform.name,
              slug: el.platform.slug
            }
          }))
        },

        genres: {
          connectOrCreate: game.genres.map((genre) => ({
            where: { slug: genre.slug },
            create: {
              name: genre.name,
              slug: genre.slug,
              backgroundImage: genre.image_background
            }
          }))
        },

        tags: {
          connectOrCreate: game.tags.map((tag) => ({
            where: { slug: tag.slug },
            create: {
              name: tag.name,
              slug: tag.slug,
              backgroundImage: tag.image_background
            }
          }))
        }
      },
      update: {}
    }))

    const createdGames = await prisma.$transaction(
      gameData.map((data) =>
        prisma.game.upsert({
          where: { slug: data.where.slug },
          create: data.create,
          update: data.update
        })
      )
    )

    console.log('Seed completed successfully.', createdGames)
  } catch (error) {
    console.error('Seed failed:', error)
  } finally {
    // Close the Prisma client
    await prisma.$disconnect()
  }
}
