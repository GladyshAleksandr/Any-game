import CheckboxPlus from '@icons/CheckboxPlus.svg'
import CheckboxMinus from '@icons/CheckboxMinus.svg'
import CheckboxEmpty from '@icons/CheckboxEmpty.svg'
import classNames from '@/lib/utils/classNames'
import CustomSlider from '../molecules/CustomSlider'
import { OptionType, Option } from '@/lib/backend/types/FilterOption'
import { useRef, useEffect } from 'react'
import { isCheckBox, isIncludeExcludeCheckBox, isSlider } from '../../utils/filterOptionUnion'
import styles from '@/styles/scrollbar.module.css'

type ComponentProps = {
  isOpen: boolean
  type: OptionType
  options: Option[]
  handleToggleOption: (type?: OptionType) => void
  handleToggleCheckBox: (type: OptionType, slug: string) => void
  handleSlider: (type: OptionType, value: [number, number]) => void
}

const FilterSubOptions = ({
  isOpen,
  type,
  options,
  handleToggleOption,
  handleToggleCheckBox,
  handleSlider
}: ComponentProps) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleToggleOption()
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  const widerSubOption = isSlider(type) || type === OptionType.Tags

  return (
    <div
      className={classNames(
        'absolute z-10 top-12 left-0 mt-4 rounded-xl bg-[#1b1b1b] max-h-100 overflow-y-auto',
        styles['show-scrollbar'],
        widerSubOption ? 'grid-cols-3 w-80' : 'w-full' //TODO Pos for slider
      )}
      ref={menuRef}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      {isCheckBox(type) ? (
        <div className={classNames('grid py-2', type === OptionType.Tags && 'xl:grid-cols-3')}>
          {options.map((option) => (
            <div
              className="h-8 space-x-1 px-2 overflow-x-hidden flex justify-start items-center"
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
  )
}

export default FilterSubOptions
