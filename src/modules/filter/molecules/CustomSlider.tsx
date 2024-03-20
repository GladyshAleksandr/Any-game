import { Colors } from '@/lib/ui/constants/Colors'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useState } from 'react'
import { OptionType } from '../types/FilterOption'

const CustomSlider = ({ type }: { type: OptionType }) => {
  const currentYear = new Date().getFullYear()
  const startDecade = 1980
  const endDecade = Math.ceil(currentYear / 5) * 5

  const [value, setValue] = useState(
    type === OptionType.Rating ? [0, 10] : [startDecade, startDecade]
  )

  const sliderValue = () => {
    if (type === OptionType.ReleaseYear) {
      const sliderOpt: {
        marks: { [key: number]: string }
        min: number
        max: number
      } = {
        marks: {},
        min: startDecade,
        max: endDecade
      }

      for (let year = startDecade; year <= endDecade; year += 5) {
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

  console.log('value', value)
  return (
    <>
      {type === OptionType.ReleaseYear && (
        <div className="flex justify-between">
          <p>{value[0]}</p>
          <p>{value[1]}</p>
        </div>
      )}
      <Slider
        range
        min={sliderValue().min}
        max={sliderValue().max}
        step={1}
        value={value}
        onChange={(index) => setValue(index)}
        marks={sliderValue().marks}
        trackStyle={{ backgroundColor: Colors.GOLD }}
        railStyle={{ backgroundColor: Colors.SILVER }}
      />
    </>
  )
}

export default CustomSlider
