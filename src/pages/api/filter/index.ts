import { ExtendRequestSession } from '@/lib/backend/middlewares/sessionMiddleware'
import { OptionType } from '@/lib/backend/types/FilterOption'
import { withRouter } from '@/lib/backend/withRouter'
import prisma from '@/lib/prisma'
import { FilterReqData } from '@/lib/ui/api-client/filter'
import {
  isCheckBox,
  isIncludeExcludeCheckBox,
  isSearchField,
  isSlider
} from '@/modules/filter/utils/filterOptionUnion'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest & ExtendRequestSession,
  res: NextApiResponse
) {
  await withRouter({
    req,
    res,
    postRoute: {
      controller: GamesByFilter
    }
  })
}

const GamesByFilter = async (req: NextApiRequest & ExtendRequestSession, res: NextApiResponse) => {
  const data = req.body as FilterReqData[]

  // const searchField = data.find((el) => isSearchField(el.type))
  // const sliders = data.filter((el) => isSlider(el.type))
  // const checkboxes = data.filter((el) => isCheckBox(el.type) && !isIncludeExcludeCheckBox(el.type))
  // const includeExcludeCheckBoxes = data.filter((el) => isIncludeExcludeCheckBox(el.type))

  const searchField = data.find((el) => el.type === OptionType.Search)

  const genres = data.filter((el) => el.type === OptionType.Genres)
  const tags = data.filter((el) => el.type === OptionType.Tags)
  const platforms = data.filter((el) => el.type === OptionType.Platforms)

  const releaseYear = data.filter((el) => el.type === OptionType.ReleaseYear)
  const rating = data.filter((el) => el.type === OptionType.Rating)

  const AdultRating = data.filter((el) => el.type === OptionType.AdultRating)
  const status = data.filter((el) => el.type === OptionType.Status)

  const filteredGames = await prisma.game.findMany({
    where: {
      AND: [
        { name: searchField?.options[0]?.value || undefined },
        {
          genres: {
            some: {
              slug: {
                in: genres.flatMap((item) =>
                  item.options
                    .filter((option) => option.value === true)
                    .map((option) => option.slug)
                )
              }
            },

            every: {
              NOT: {
                slug: {
                  in: genres.flatMap((item) =>
                    item.options
                      .filter((option) => option.value === false)
                      .map((option) => option.slug)
                  )
                }
              }
            }
          }
        }
      ]
    }
  })

  try {
    const filteredGames = await prisma.game.findMany({ where: {} })

    return res.status(200).json({})
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
