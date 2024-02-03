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

const generate = async () => {
  try {
    const gamesReq = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`
    )

    const games: Games[] = gamesReq.data.results
    // console.log('DATA IN BACK METHOD', games)
    const res = await prisma.game.createMany({
      data: games.map((game) => ({
        id: game.id,
        name: game.name,
        slug: game.slug,
        backgroundImage: game.background_image,
        screenshots: game.short_screenshots.map((screenshot) => screenshot.image),
        metacritic: game.metacritic,
        esrbRatingId: game.esrb_rating.id, //! FIX this
        parentPlatforms: game.parent_platforms.map((el) => ({
          id: el.platform.id,
          name: el.platform.name,
          slug: el.platform.slug
        })),

        genres: game.genres.map((genre) => ({
          id: genre.id,
          name: genre.name,
          slug: genre.slug,
          backgroundImage: genre.image_background
        })),
        tags: game.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
          backgroundImage: tag.image_background
        }))
      }))
    })
    console.log('res')

    console.log('Seed completed successfully.')
  } catch (error) {
    console.error('Seed failed:', error)
  } finally {
    // Close the Prisma client
    await prisma.$disconnect()
  }
}
