import { OptionType } from '@/lib/backend/types/FilterOption'

export const isSearchField = (option: OptionType) => option === OptionType.Search

export const isSimpleCheckBox = (option: OptionType) =>
  option === OptionType.Status || option === OptionType.UserGameStatus

export const isCheckBox = (option: OptionType) =>
  option === OptionType.Genres ||
  option === OptionType.Tags ||
  option === OptionType.Platforms ||
  option === OptionType.AdultRating

export const isIncludeExcludeCheckBox = (type: OptionType) =>
  type === OptionType.Genres || type === OptionType.Tags || type === OptionType.Platforms

export const isSlider = (option: OptionType) =>
  option === OptionType.ReleaseYear || option === OptionType.Rating
