import { OptionType } from '@/lib/backend/types/FilterOption'

export const isSearchField = (option: OptionType) => option === OptionType.Search

export const isCheckBox = (option: OptionType) => {
  return (
    option === OptionType.Genres ||
    option === OptionType.Tags ||
    option === OptionType.Platforms ||
    option === OptionType.AdultRating ||
    option === OptionType.Status
  )
}

export const isSlider = (option: OptionType) => {
  return option === OptionType.ReleaseYear || option === OptionType.Rating
}
