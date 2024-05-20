import { FilterOptionType, OptionType } from '@/lib/backend/types/FilterOption'
import FilterSubOptions from '../atoms/FilterSubOption'
import { isSearchField, isSimpleCheckBox } from '../../utils/filterOptionUnion'
import OptionButton from 'components/OptionButton'
import Collapse from '@icons/Collapse.svg'
import CheckboxPlus from '@icons/CheckboxPlus.svg'
import CheckboxMinus from '@icons/CheckboxMinus.svg'

type ComponentProps = {
  handleToggleOption: (type?: OptionType) => void
  handleToggleCheckBox: (type: OptionType, slug: string) => void
  handleSearchField: (type: OptionType, value: string) => void
  handleSlider: (type: OptionType, value: [number, number]) => void
}

const FilterOption = ({
  text,
  isOpen,
  type,
  options,
  handleToggleOption,
  handleToggleCheckBox,
  handleSearchField,
  handleSlider
}: ComponentProps & FilterOptionType) => {
  return (
    <div className="w-full">
      {isSearchField(type) ? (
        <OptionButton
          isSeachField
          onChange={(event) => handleSearchField(type, event.target.value)}
          className="w-full"
        >
          {text}
        </OptionButton>
      ) : isSimpleCheckBox(type) ? (
        <OptionButton
          onClick={() => handleToggleOption(type)}
          openContent={<CheckboxPlus className="w-4 h-4" />}
          closeContent={<CheckboxMinus className="w-4 h-4" />}
          className="w-full"
        >
          {text}
        </OptionButton>
      ) : (
        <OptionButton
          className="relative w-full"
          openContent={<Collapse className="w-4 h-4" />}
          closeContent={<Collapse className="w-4 h-4" />}
          onClick={(event) => {
            event.stopPropagation()
            handleToggleOption(type)
          }}
        >
          {text}
          {isOpen && (
            <FilterSubOptions
              isOpen={isOpen}
              type={type}
              options={options}
              handleToggleOption={handleToggleOption}
              handleToggleCheckBox={handleToggleCheckBox}
              handleSlider={handleSlider}
            />
          )}
        </OptionButton>
      )}
    </div>
  )
}

export default FilterOption
