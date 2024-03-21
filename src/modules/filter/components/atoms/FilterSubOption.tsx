import CheckboxPlus from '@icons/CheckboxPlus.svg'
import CheckboxMinus from '@icons/CheckboxMinus.svg'
import CheckboxEmpty from '@icons/CheckboxEmpty.svg'
import classNames from '@/lib/utils/classNames'
import CustomSlider from '../molecules/CustomSlider'
import { OptionType, Option } from '@/lib/backend/types/FilterOption'
import { useRef, useEffect } from 'react'
import { isCheckBox, isSlider } from '../../utils/filterOptionUnion'

type ComponentProps = {
  isOpen: boolean
  type: OptionType
  options: Option[]
  handleToggleOption: (type?: OptionType) => void
  handleToggleCheckBox: (type: OptionType, slug: string) => void
  handleSlider: (type: OptionType, value: [number, number]) => void
}

const FilterSubOption = ({
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
  return (
    <div
      className="absolute z-10 left-0 mt-4 rounded-xl bg-[#1b1b1b]"
      ref={menuRef}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      {isCheckBox(type) ? (
        <div className={classNames('grid w-48', options.length > 20 && 'grid-cols-3 w-[594px]')}>
          {options.map((option) => (
            <div
              className="p-4 h-8 flex justify-start items-center space-x-2"
              key={option.name}
              onClick={() => handleToggleCheckBox(type, option.slug)}
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
      ) : isSlider(type) ? (
        <div className={classNames('p-8', type === OptionType.Rating ? 'w-[394px]' : 'w-[594px]')}>
          <CustomSlider type={type} handleSlider={handleSlider} options={options} />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default FilterSubOption
