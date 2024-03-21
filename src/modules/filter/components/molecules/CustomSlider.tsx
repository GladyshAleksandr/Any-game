import { OptionType, Option } from '@/lib/backend/types/FilterOption'
import { Colors } from '@/lib/ui/constants/Colors'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { getSliderData } from '../../utils/getInitialFilterOptions'

type ComponentProps = {
  type: OptionType
  options: Option[]
  handleSlider: (type: OptionType, value: [number, number]) => void
}

const CustomSlider = ({ type, options, handleSlider }: ComponentProps) => {
  const sliderValue = () => {
    if (type === OptionType.ReleaseYear) {
      const sliderOpt: {
        marks: { [key: number]: string }
        min: number
        max: number
      } = {
        marks: {},
        min: getSliderData().startDecade,
        max: getSliderData().endDecade
      }

      for (let year = getSliderData().startDecade; year <= getSliderData().endDecade; year += 5) {
        sliderOpt.marks[year] = `${year}s`
      }

      return sliderOpt
    }

    const sliderOpt = {
      marks: {
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
      },
      min: 0,
      max: 10
    }

    return sliderOpt
  }

  return (
    <>
      {type === OptionType.ReleaseYear && (
        <div className="flex justify-between">
          <p>{options[0].value[0]}</p>
          <p>{options[0].value[1]}</p>
        </div>
      )}

      <Slider
        range
        min={sliderValue().min}
        max={sliderValue().max}
        step={1}
        value={options[0].value}
        onChange={(index) => handleSlider(type, index as [number, number])}
        marks={sliderValue().marks}
        trackStyle={{ backgroundColor: Colors.GOLD }}
        railStyle={{ backgroundColor: Colors.SILVER }}
      />
    </>
  )
}

export default CustomSlider
