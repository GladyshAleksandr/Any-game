import classNames from '@/lib/utils/classNames'
import { EsrbRating, Game, Genre, ParentPlatform, Tag } from '@prisma/client'
import { useState } from 'react'
import CheckboxPlus from '@icons/CheckboxPlus.svg'
import CheckboxMinus from '@icons/CheckboxMinus.svg'
import CheckboxEmpty from '@icons/CheckboxEmpty.svg'
import CustomSlider from './CustomSlider'
import {
  FilterOption,
  OptionType,
  isSearchField,
  isCheckBox,
  isSlider
} from '../types/FilterOption'

type ComponentProps = {
  genres: Genre[]
  tags: Tag[]
  parentPlatforms: ParentPlatform[]
  esrbRatings: EsrbRating[]
}

const Filter = ({ genres, tags, parentPlatforms, esrbRatings }: ComponentProps) => {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
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
      options: [{ name: '', slug: '', value: null }]
    },
    {
      text: 'Rating',
      isOpen: false,
      type: OptionType.Rating,
      options: [{ name: '', slug: '', value: null }]
    },
    {
      text: 'Adult Rating',
      isOpen: false,
      type: OptionType.AdultRating,
      options: esrbRatings.map((rating) => ({
        name: '',
        slug: '',
        value: null
      }))
    },
    {
      text: 'Status',
      isOpen: false,
      type: OptionType.Status,
      options: [{ name: '', slug: '', value: null }]
    }
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
              {el.isOpen && (
                <div className="absolute z-10 left-0 mt-4 rounded-xl bg-[#1b1b1b]">
                  {isSearchField(el.type) ? (
                    <></>
                  ) : isCheckBox(el.type) ? (
                    <div
                      className={classNames('grid w-max', el.options.length > 20 && 'grid-cols-')}
                    >
                      {el.options.map((option) => (
                        <div
                          className="p-4 h-8 flex justify-start items-center space-x-2"
                          onClick={() => setFilterOptions}
                          key={option.name}
                        >
                          {option.value === true ? (
                            <CheckboxPlus className="w-4" />
                          ) : option.value === false ? (
                            <CheckboxMinus className="w-4" />
                          ) : (
                            <CheckboxEmpty className="w-4" />
                          )}
                          <p className="max-w-[120px] truncate text-sm">{option.name}</p>
                        </div>
                      ))}
                    </div>
                  ) : isSlider(el.type) ? (
                    <div
                      className={classNames(
                        'p-8',
                        el.type === OptionType.Rating ? 'w-[394px]' : 'w-[594px]'
                      )}
                    >
                      <CustomSlider type={el.type} />
                    </div>
                  ) : (
                    <></>
                  )}
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
