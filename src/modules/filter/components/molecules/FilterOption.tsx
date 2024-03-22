import { FilterOptionType, OptionType } from '@/lib/backend/types/FilterOption'
import FilterSubOption from '../atoms/FilterSubOption'
import { isSearchField } from '../../utils/filterOptionUnion'
import OptionButton from 'components/ui/OptionButton'

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
    <div>
      {isSearchField(type) ? (
        <OptionButton
          isSeachField
          onChange={(event) => handleSearchField(type, event.target.value)}
        >
          {text}
        </OptionButton>
      ) : (
        <OptionButton
          className="relative"
          onClick={(event) => {
            event.stopPropagation()
            handleToggleOption(type)
          }}
        >
          {text}
          {isOpen && (
            <FilterSubOption
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
