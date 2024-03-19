import classNames from '@/lib/utils/classNames'
import { EsrbRating, Game, Genre, ParentPlatform, Tag } from '@prisma/client'
import { useState } from 'react'
import CheckboxPlus from '@icons/CheckboxPlus.svg'
import CheckboxMinus from '@icons/CheckboxMinus.svg'
import CheckboxEmpty from '@icons/CheckboxEmpty.svg'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Colors } from '@/lib/ui/constants/Colors'

type Option = {
  name: string
  slug: string
  status: boolean | null
}

type FilterOption = {
  text: string
  isOpen: boolean
  sliderOpt:  Marks | null
  options: Option[] | null
}

type ComponentProps = {
  genres: Genre[]
  tags: Tag[]
  parentPlatforms: ParentPlatform[]
  esrbRatings: EsrbRating[]
}

type Marks = {
  [key: number]: string;
}

const sliderValue = () => {
  const currentYear = new Date().getFullYear();
  const startDecade = 1980;
  const endDecade = Math.floor(currentYear / 10) * 10; // Round down to the nearest decade
  
  const sliderOpt: { [key: number]: string } = {};
  
  // Add decades
  for (let year = startDecade; year <= endDecade; year += 10) {
    sliderOpt[year] = `${year}s`;
  }
  
  // Add specific years
  for (let year = endDecade + 1; year <= currentYear; year++) {
    sliderOpt[year] = `${year}`;
  }

  return sliderOpt
  
}

const Filter = ({ genres, tags, parentPlatforms, esrbRatings }: ComponentProps) => {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    { text: 'Search', isOpen: false, sliderOpt: null options: null },
    {
      text: 'Genres',
      isOpen: false,
      sliderOpt: null,
      options: genres.map((genre) => ({ name: genre.name, slug: genre.slug, status: null }))
    },
    {
      text: 'Tags',
      isOpen: false,
      sliderOpt: null,
      options: tags.map((tag) => ({ name: tag.name, slug: tag.slug, status: null }))
    },
    {
      text: 'Platforms',
      isOpen: false,
      sliderOpt: null,
      options: parentPlatforms.map((platform) => ({
        name: platform.name,
        slug: platform.slug,
        status: null
      }))
    },
    {
      text: 'Year',
      isOpen: false,
      sliderOpt: sliderValue(),
      options: []
    },
    { text: 'Rating', isOpen: false, sliderOpt: {
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10'
    }, options: [] },
    {
      text: 'Adult Rating',
      isOpen: false,
      sliderOpt: null,
      options: esrbRatings.map((rating) => ({
        name: rating.name,
        slug: rating.slug,
        status: null
      }))
    },
    { text: 'Status', isOpen: false, sliderOpt: null, options: [] }
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
              {el.isOpen ? (<></>) : el.options && (
              //    <Slider
              //    range
              //    min={0}
              //    max={10}
              //    step={1}
              //    marks={marks}
              //    trackStyle={{ backgroundColor: Colors.GOLD }}
              //    railStyle={{ backgroundColor: Colors.SILVER }}
              //  />
                <div className="absolute z-10 left-0 mt-4 rounded-xl bg-[#1b1b1b]">
                  <div
                    className={classNames('grid w-max', el.options.length > 20 && 'grid-cols-4')}
                  >
                    {el.options.map((option) => (
                      <div className="p-4 h-8 flex justify-start items-center space-x-2">
                        {option.status === true ? (
                          <CheckboxPlus className="w-4" />
                        ) : option.status === false ? (
                          <CheckboxMinus className="w-4" />
                        ) : (
                          <CheckboxEmpty className="w-4" />
                        )}

                        <p className="max-w-[120px] truncate text-sm">{option.name}</p>
                      </div>
                    ))}
                  </div>
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
