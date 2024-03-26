import { FilterOptionType, OptionType } from '@/lib/backend/types/FilterOption'
import FilterSubOptions from '../atoms/FilterSubOption'
import { isSearchField } from '../../utils/filterOptionUnion'
import OptionButton from 'components/ui/OptionButton'
import Collapse from '@icons/Collapse.svg'

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
      ) : (
        <OptionButton
          className="relative w-full"
          onClick={(event) => {
            event.stopPropagation()
            handleToggleOption(type)
          }}
        >
          <div className="w-full px-4 flex justify-between items-center">
            {text}

            <Collapse className="w-4 h-4" />
          </div>
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
