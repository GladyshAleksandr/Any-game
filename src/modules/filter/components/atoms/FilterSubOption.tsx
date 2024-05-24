import CheckboxPlus from '@icons/CheckboxPlus.svg'
import CheckboxMinus from '@icons/CheckboxMinus.svg'
import CheckboxEmpty from '@icons/CheckboxEmpty.svg'
import classNames from '@/lib/utils/classNames'
import CustomSlider from '../molecules/CustomSlider'
import { OptionType, Option } from '@/lib/backend/types/FilterOption'
import { useRef } from 'react'
import { isCheckBox, isIncludeExcludeCheckBox, isSlider } from '../../utils/filterOptionUnion'
import styles from '@/styles/scrollbar.module.css'
import UseClickOutside from '@/lib/ui/utils/useClickOutside'

type ComponentProps = {
  isOpen: boolean
  filterByAllSelectedOptions: boolean
  type: OptionType
  options: Option[]
  handleToggleOption: (type?: OptionType) => void
  handleFilterbyAllSelectedOptions: (type: OptionType) => void
  handleToggleCheckBox: (type: OptionType, slug: string) => void
  handleSlider: (type: OptionType, value: [number, number]) => void
}

const FilterSubOptions = ({
  isOpen,
  filterByAllSelectedOptions,
  type,
  options,
  handleToggleOption,
  handleFilterbyAllSelectedOptions,
  handleToggleCheckBox,
  handleSlider
}: ComponentProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  UseClickOutside(menuRef, isOpen, () => handleToggleOption())

  const widerSubOption = isSlider(type) || type === OptionType.Tags

  const mustHaveText = (type: OptionType) => {
    if (type === OptionType.Genres) return 'Must have all selected genres'
    if (type === OptionType.Tags) return 'Must have all selected tags'
    if (type === OptionType.Platforms) return 'Must have all selected platforms'
  }

  return (
    <div
      className="absolute z-10 top-12 left-0 mt-4 rounded-xl bg-gray"
      ref={menuRef}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <div
        className={classNames(
          'max-h-100 overflow-y-auto',
          styles['show-scrollbar'],
          widerSubOption ? 'grid-cols-3 w-80' : 'w-full' //TODO Pos for slider
        )}
      >
        {isCheckBox(type) ? (
          <div className={classNames('grid py-2', type === OptionType.Tags && 'xl:grid-cols-3')}>
            {options.map((option) => (
              <div
                className="h-8 space-x-1 overflow-x-hidden flex justify-start items-center px-4 hover:bg-lightRed"
                key={option.name}
                onClick={() => handleToggleCheckBox(type, option.slug)}
              >
                {option.value === true ? (
                  <CheckboxPlus className="w-4 h-4" />
                ) : option.value === false && isIncludeExcludeCheckBox(type) ? (
                  <CheckboxMinus className="w-4 h-4" />
                ) : (
                  <CheckboxEmpty className="w-4 h-4" />
                )}
                <p className="w-[calc(100%-1rem)] truncate text-sm">{option.name}</p>
              </div>
            ))}
          </div>
        ) : isSlider(type) ? (
          <div className={classNames('p-8')}>
            <CustomSlider type={type} handleSlider={handleSlider} options={options} />
          </div>
        ) : (
          <></>
        )}
      </div>
      {isIncludeExcludeCheckBox(type) ? (
        <div
          className="h-8 space-x-1 my-2 overflow-x-hidden flex justify-start items-center px-4 hover:bg-lightRed"
          key={type}
          onClick={() => handleFilterbyAllSelectedOptions(type)}
        >
          {filterByAllSelectedOptions === true ? (
            <CheckboxPlus className="w-4 h-4" />
          ) : (
            <CheckboxEmpty className="w-4 h-4" />
          )}
          <p className="truncate text-sm">{mustHaveText(type)}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default FilterSubOptions
