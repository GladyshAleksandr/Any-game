import { fetchAllGames } from '@/lib/backend/utils/fetchAllgames'
import prisma from '@/lib/prisma'

const seedGames = async () => {
  try {
    const games = await fetchAllGames()

    const gameData = games.map((game) => ({
      where: { slug: game.slug },
      create: {
        name: game.name,
        slug: game.slug,
        backgroundImage: game.background_image,
        screenshots: game.short_screenshots.map((screenshot) => screenshot.image),
        metacritic: game.metacritic,
        esrbRating: game.esrb_rating
          ? {
              connectOrCreate: {
                where: { slug: game.esrb_rating.slug },
                create: { name: game.esrb_rating.name, slug: game.esrb_rating.slug }
              }
            }
          : undefined,

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

export const seed = async () => {
  await seedGames()
  console.log('[SEEDER] Done')
}

if (process.env.CLI_START) {
  seed()
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}
