import { OptionType, Option } from '@/lib/backend/types/FilterOption'
import axios from 'axios'

export type FilterReqData = { type: OptionType; options: Option[] }

const filter = async (data: FilterReqData[]) => axios.post('/api/filter', data) // TODO URL HISTORY

const byName = async (name: string) => axios.get(`/api/filter/search/${name}`)

const byGenre = async (slug: string) => axios.get(`/api/filter/genre/${slug}`)

const byTag = async (slug: string) => axios.get(`/api/filter/tag/${slug}`)

const byPlatform = async (slug: string) => axios.get(`/api/filter/platform/${slug}`)

const FilterAPI = {
  filter,
  byName,
  byGenre,
  byTag,
  byPlatform
}

export default FilterAPI
