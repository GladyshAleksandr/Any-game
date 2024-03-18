import { EsrbRating, Game, Genre, ParentPlatform, Tag } from '@prisma/client'
import { useState } from 'react'

type Option = {
  name: string
  slug: string
  status: boolean | null
}

type FilterOption = {
  text: string
  isOpen: boolean
  options: Option[] | null
}

type ComponentProps = {
  genres: Genre[]
  tags: Tag[]
  parentPlatforms: ParentPlatform[]
  esrbRatings: EsrbRating[]
}
const Filter = ({ genres, tags, parentPlatforms, esrbRatings }: ComponentProps) => {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    { text: 'Search', isOpen: false, options: null },
    {
      text: 'Genres',
      isOpen: false,
      options: genres.map((genre) => ({ name: genre.name, slug: genre.slug, status: null }))
    },
    {
      text: 'Tags',
      isOpen: false,
      options: tags.map((tag) => ({ name: tag.name, slug: tag.slug, status: null }))
    },
    {
      text: 'Platforms',
      isOpen: false,
      options: parentPlatforms.map((platform) => ({
        name: platform.name,
        slug: platform.slug,
        status: null
      }))
    },
    { text: 'Year', isOpen: false, options: [] },
    { text: 'Rating', isOpen: false, options: [] },
    { text: 'Adult Rating', isOpen: false, options: [] },
    { text: 'Status', isOpen: false, options: [] }
  ])

  const handleToggleOption = (el: FilterOption) => {
    setFilterOptions((prevState) =>
      prevState.map((option) =>
        option.text === el.text ? { ...option, isOpen: !el.isOpen } : option
      )
    )
  }
  return (
    <div className="flex flex-col items-center mt-4 space-y-4">
      <p className="text-lg font-semibold">
        Choose multiple options to find what you want! Include or exclude: genres, tags, and
        platforms.
      </p>
      <div className="grid grid-cols-4 gap-2 justify-items-center">
        {filterOptions.map((el) => (
          <>
            <div
              className="w-48 p-3 bg-[#1b1b1b] text-center rounded-xl cursor-pointer relative"
              onClick={() => handleToggleOption(el)}
            >
              {el.text}
              {el.isOpen && el.options && (
                <div className="absolute w-full z-10 left-0 mt-4 rounded-xl bg-[#1b1b1b]">
                  {el.options.map((option) => (
                    <div>
                      <p>{option.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default Filter
