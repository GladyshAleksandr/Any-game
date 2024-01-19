import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

type Games = {
  id: number
  name: string
  background_image: string
  slug: string
  short_screenshots: { image: string }[]
  metacritic: number
  rating_top: number
  esrb_rating: string
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

const generateGamesData = async () => {
  try {
    const gamesReq = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`
    )

    const games: Games[] = gamesReq.data.results

    await prisma.game.createMany({
      data: games.map((game) => ({
        id: game.id,
        name: game.name,
        slug: game.slug,
        backgroundImage: game.background_image,
        screenshots: game.short_screenshots.map((screenshot) => screenshot.image),
        metacritic: game.metacritic,
        esrbRating: game.esrb_rating,
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

    console.log('Seed completed successfully.')
  } catch (error) {
    console.error('Seed failed:', error)
  } finally {
    // Close the Prisma client
    await prisma.$disconnect()
  }
}
