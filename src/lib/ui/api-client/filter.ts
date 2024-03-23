import { OptionType, Option } from '@/lib/backend/types/FilterOption'
import axios from 'axios'

export type FilterReqData = { type: OptionType; options: Option[] }

const filter = async (data: FilterReqData[]) => axios.post('/api/filter', data) // TODO URL HISTORY

const FilterAPI = {
  filter
}

export default FilterAPI
