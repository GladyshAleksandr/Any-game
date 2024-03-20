export enum OptionType {
  Search = 1,
  Genres,
  Tags,
  Platforms,
  ReleaseYear,
  Rating,
  AdultRating,
  Status
}

export type FilterOption = {
  text: string
  isOpen: boolean
  type: OptionType
  options: Option[]
}

type Option = {
  name: string
  slug: string
  value: any
}

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
