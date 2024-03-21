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

export type Option = {
  name: string
  slug: string
  value: any
}

export type FilterOptionType = {
  text: string
  isOpen: boolean
  type: OptionType
  options: Option[]
}
