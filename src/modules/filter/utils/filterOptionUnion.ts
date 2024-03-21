import { OptionType } from '@/lib/backend/types/FilterOption'

export const isSearchField = (option: OptionType) => option === OptionType.Search

export const isCheckBox = (option: OptionType) =>
  option === OptionType.Genres ||
  option === OptionType.Tags ||
  option === OptionType.Platforms ||
  option === OptionType.AdultRating ||
  option === OptionType.Status

export const isSlider = (option: OptionType) =>
  option === OptionType.ReleaseYear || option === OptionType.Rating

export const isIncludeExcludeCheckBox = (type: OptionType) =>
  type === OptionType.Genres || type === OptionType.Tags || type === OptionType.Platforms
