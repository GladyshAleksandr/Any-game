import { EsrbRating, Genre, ParentPlatform, Tag } from '@prisma/client'
import { Dispatch, SetStateAction, useState } from 'react'
import { FilterOptionType, OptionType } from '@/lib/backend/types/FilterOption'
import getInitialFilterOptions from '../../utils/getInitialFilterOptions'
import FilterOption from '../molecules/FilterOption'
import { isIncludeExcludeCheckBox } from '../../utils/filterOptionUnion'
import { GameExtended } from '@/types/types'
import FilterAPI from '@/lib/ui/api-client/filter'

type ComponentProps = {
  genres: Genre[]
  tags: Tag[]
  parentPlatforms: ParentPlatform[]
  esrbRatings: EsrbRating[]
  setFilteredGames: Dispatch<SetStateAction<GameExtended[]>>
}

const Filter = ({
  genres,
  tags,
  parentPlatforms,
  esrbRatings,
  setFilteredGames
}: ComponentProps) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptionType[]>(
    getInitialFilterOptions(genres, tags, parentPlatforms, esrbRatings)
  )

  const handleToggleOption = (type?: OptionType) => {
    setFilterOptions((prevState) =>
      prevState.map((option) =>
        type
          ? option.type === type
            ? { ...option, isOpen: !option.isOpen }
            : { ...option, isOpen: false }
          : { ...option, isOpen: false }
      )
    )
  }

  const handleToggleCheckBox = (type: OptionType, slug: string) => {
    setFilterOptions((prevState) =>
      prevState.map((option) =>
        option.type === type
          ? {
              ...option,
              options: option.options.map((el) =>
                el.slug === slug
                  ? {
                      ...el,
                      value: isIncludeExcludeCheckBox(option.type)
                        ? el.value === true
                          ? false
                          : el.value === false
                            ? null
                            : true
                        : el.value === null
                          ? true
                          : null
                    }
                  : el
              )
            }
          : option
      )
    )
  }

  const handleSearchField = (type: OptionType, value: string) => {
    setFilterOptions((prevState) =>
      prevState.map((option) =>
        option.type === type
          ? {
              ...option,
              options: option.options.map((el) => ({
                ...el,
                value: value
              }))
            }
          : option
      )
    )
  }

  const handleSlider = (type: OptionType, value: [number, number]) => {
    setFilterOptions((prevState) =>
      prevState.map((option) =>
        option.type === type
          ? {
              ...option,
              options: option.options.map((el) => ({
                ...el,
                value: value
              }))
            }
          : option
      )
    )
  }

  const hanleSubmit = async () => {
    const optionsToSend = filterOptions
      .filter((option) => option.options.some((el) => el.value !== null))
      .map((option) => ({
        type: option.type,
        options: option.options.filter((el) => el.value !== null)
      }))

    const res = await FilterAPI.filter(optionsToSend)
    setFilteredGames(res.data.filteredGames)
  }

  return (
    <div className="flex flex-col items-center mt-4 space-y-4">
      <p className="text-lg font-semibold">
        Choose multiple options to find what you want! Include or exclude: genres, tags, and
        platforms.
      </p>
      <div className="w-full grid xs:grid-cols-2 md:grid-cols-4 xl:flex gap-2 justify-items-center">
        {filterOptions.map((el) => (
          <FilterOption
            key={el.text}
            text={el.text}
            isOpen={el.isOpen}
            type={el.type}
            options={el.options}
            handleToggleOption={handleToggleOption}
            handleToggleCheckBox={handleToggleCheckBox}
            handleSearchField={handleSearchField}
            handleSlider={handleSlider}
          />
        ))}
      </div>
      <div
        className="w-1/3 h-1/2 p-3 font-bold bg-darkGold rounded-xl text-center cursor-pointer"
        onClick={hanleSubmit}
      >
        Search
      </div>
    </div>
  )
}

export default Filter
