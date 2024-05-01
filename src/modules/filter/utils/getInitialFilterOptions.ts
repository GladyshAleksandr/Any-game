import { OptionType } from '@/lib/backend/types/FilterOption'
import { Genre, Tag, ParentPlatform, EsrbRating } from '@prisma/client'

const getInitialFilterOptions = (
  genres: Genre[],
  tags: Tag[],
  parentPlatforms: ParentPlatform[],
  esrbRatings: EsrbRating[]
) => [
  {
    text: 'Search',
    isOpen: false,
    type: OptionType.Search,
    options: [{ name: '', slug: '', value: null }]
  },
  {
    text: 'Genres',
    isOpen: false,
    type: OptionType.Genres,
    options: genres.map((genre) => ({ name: genre.name, slug: genre.slug, value: null }))
  },
  {
    text: 'Tags',
    isOpen: false,
    type: OptionType.Tags,
    options: tags.map((tag) => ({ name: tag.name, slug: tag.slug, value: null }))
  },
  {
    text: 'Platforms',
    isOpen: false,
    type: OptionType.Platforms,
    options: parentPlatforms.map((platform) => ({
      name: platform.name,
      slug: platform.slug,
      value: null
    }))
  },
  {
    text: 'Year',
    isOpen: false,
    type: OptionType.ReleaseYear,
    options: [{ name: '', slug: '', value: getSliderData().defaultValue.year }]
  },
  {
    text: 'Rating',
    isOpen: false,
    type: OptionType.Rating,
    options: [{ name: '', slug: '', value: getSliderData().defaultValue.rating }]
  },
  {
    text: 'Adult Rating',
    isOpen: false,
    type: OptionType.AdultRating,
    options: esrbRatings.map((rating) => ({
      name: rating.name,
      slug: rating.slug,
      value: null
    }))
  },
  {
    text: 'In Game List',
    isOpen: false,
    type: OptionType.UserGameStatus,
    options: [{ name: '', slug: '', value: null }]
  },
  {
    text: 'Announced',
    isOpen: false,
    type: OptionType.Status,
    options: [{ name: '', slug: '', value: null }]
  }
]

export const getSliderData = () => {
  const currentYear = new Date().getFullYear()
  const startDecade = 1980

  const defaultValue = {
    rating: [0, 10],
    year: [startDecade, currentYear]
  }
  return { currentYear, startDecade, defaultValue }
}

export default getInitialFilterOptions
