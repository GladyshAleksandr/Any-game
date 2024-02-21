export type Games = {
  id: number
  name: string
  background_image: string
  slug: string
  short_screenshots: { image: string }[]
  metacritic: number
  rating_top: number
  released: string
  tba: boolean
  platforms: {
    platform: {
      slug: string
    }
    requirements_en: {
      minimum: string
      recommended: string
    }
  }[]
  esrb_rating: {
    id: number
    name: string
    slug: string
  }
  parent_platforms: {
    platform: {
      id: number
      name: string
      slug: string
    }
  }[]
  tags: {
    id: number
    name: string
    slug: string
    image_background: string
  }[]
  genres: {
    id: number
    name: string
    slug: string
    image_background: string
  }[]
}
