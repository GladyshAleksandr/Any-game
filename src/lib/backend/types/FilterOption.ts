export enum OptionType {
  Search = 1,
  Genres,
  Tags,
  Platforms,
  ReleaseYear,
  Rating,
  AdultRating,
  UserGameStatus,
  Status
}

export type Option = {
  name: string
  slug: string
  value: any
}

export type FilterOptionType = {
  text: string
  isOpen: boolean
  filterByAllSelectedOptions: boolean
  type: OptionType
  options: Option[]
}
