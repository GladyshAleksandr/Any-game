import { FilterOptionType, OptionType } from '@/lib/backend/types/FilterOption'
import FilterSubOption from '../atoms/FilterSubOption'
import { isSearchField } from '../../utils/filterOptionUnion'

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
        <input
          type="text"
          className="w-48 p-3 bg-[#1b1b1b] rounded-xl outline-none text-center cursor-text"
          placeholder={text}
          onChange={(event) => handleSearchField(type, event.target.value)}
        ></input>
      ) : (
        <div
          className="w-48 p-3 bg-[#1b1b1b] rounded-xl text-center cursor-pointer relative"
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
        </div>
      )}
    </div>
  )
}

export default FilterOption
