import { OptionType } from '@/lib/backend/types/FilterOption'
import { withRouter } from '@/lib/backend/withRouter'
import prisma from '@/lib/prisma'
import { FilterReqData } from '@/lib/ui/api-client/filter'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  ExtendRequestSession,
  sessionMiddleware
} from '@/lib/backend/middlewares/sessionMiddleware'

export default async function handler(
  req: NextApiRequest & ExtendRequestSession,
  res: NextApiResponse
) {
  await withRouter({
    req,
    res,
    postRoute: {
      controller: GamesByFilter,
      middlewares: [sessionMiddleware]
    }
  })
}

const GamesByFilter = async (req: NextApiRequest & ExtendRequestSession, res: NextApiResponse) => {
  const data = req.body as FilterReqData[]

  const userId = req.session.user.id

  const filterIncludedCheckBoxes = (arr: FilterReqData[]) => {
    return arr.flatMap((item) =>
      item.options.filter((option) => option.value).map((option) => option.slug)
    )
  }

  const filterExcludedCheckBoxes = (arr: FilterReqData[]) => {
    return arr.flatMap((item) =>
      item.options.filter((option) => !option.value).map((option) => option.slug)
    )
  }

  const searchField = data.find((el) => el.type === OptionType.Search)

  const genres = data.filter((el) => el.type === OptionType.Genres)
  const includedGenresSlugs = filterIncludedCheckBoxes(genres)
  const excludedGenresSlugs = filterExcludedCheckBoxes(genres)

  const tags = data.filter((el) => el.type === OptionType.Tags)
  const includedTagsSlugs = filterIncludedCheckBoxes(tags)
  const excludedTagsSlugs = filterExcludedCheckBoxes(tags)

  const platforms = data.filter((el) => el.type === OptionType.Platforms)
  const includedPlatformsSlugs = filterIncludedCheckBoxes(platforms)
  const excludedPlatformsSlugs = filterExcludedCheckBoxes(platforms)

  const releaseYear = data.find((el) => el.type === OptionType.ReleaseYear)
  const rating = data.find((el) => el.type === OptionType.Rating)

  const AdultRating = data.filter((el) => el.type === OptionType.AdultRating)
  const adultRatingSlugs = filterIncludedCheckBoxes(AdultRating)
  const showGamesInGameList = data.find((el) => el.type === OptionType.UserGameStatus)?.isOpen
  const status = data.find((el) => el.type === OptionType.Status)?.isOpen

  try {
    const filteredGames = await prisma.game.findMany({
      where: {
        AND: [
          {
            name: {
              contains: searchField ? searchField.options[0].value : undefined,
              mode: 'insensitive'
            }
          },
          {
            genres: {
              some: {
                slug: includedGenresSlugs.length > 0 ? { in: includedGenresSlugs } : undefined
              },

              every: {
                NOT: {
                  slug: excludedGenresSlugs.length > 0 ? { in: excludedGenresSlugs } : undefined
                }
              }
            }
          },

          {
            tags: {
              some: {
                slug: includedTagsSlugs.length > 0 ? { in: includedTagsSlugs } : undefined
              },

              every: {
                NOT: {
                  slug: excludedTagsSlugs.length > 0 ? { in: excludedTagsSlugs } : undefined
                }
              }
            }
          },

          {
            parentPlatforms: {
              some: {
                slug: includedPlatformsSlugs.length > 0 ? { in: includedPlatformsSlugs } : undefined
              },

              every: {
                NOT: {
                  slug:
                    excludedPlatformsSlugs.length > 0 ? { in: excludedPlatformsSlugs } : undefined
                }
              }
            }
          },

          {
            released: releaseYear
              ? {
                  gte: new Date(parseInt(releaseYear.options[0].value[0]), 0),
                  lte: new Date(parseInt(releaseYear.options[0].value[1]), 0)
                }
              : {}
          },
          {
            //TODO change to average rating in the future
            metacritic: rating
              ? {
                  gte: Math.round(rating.options[0].value[0] * 10),
                  lte: Math.round(rating.options[0].value[1] * 10)
                }
              : {}
          },
          {
            esrbRating:
              adultRatingSlugs.length > 0
                ? {
                    slug: {
                      in: adultRatingSlugs
                    }
                  }
                : {}
          },
          {
            users: !showGamesInGameList
              ? {
                  none: {
                    userId: userId
                  }
                }
              : {}
          },
          { tba: status }
        ]
      },
      include: {
        parentPlatforms: true
      }
    })

    return res.status(200).json({ filteredGames })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
