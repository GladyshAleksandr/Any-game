import axios from 'axios'

type GameStudioFromRAWG = {
  id: number
  slug: string
  name: string
  image_background: string
  games_count: number
  games: {
    id: number
    added: number
    name: string
    slug: string
  }[]
}

export async function fetchAllGameStudios() {
  let allGameStudios: any = []
  let currentPage = 1
  const numberOfStudios = 300
  try {
    let nextPage = await fetchGameStudios(currentPage)
    while (allGameStudios.length < numberOfStudios) {
      allGameStudios = allGameStudios.concat(nextPage)
      currentPage++ // Move to the next page
      nextPage = await fetchGameStudios(currentPage)
    }
    return allGameStudios as GameStudioFromRAWG[]
  } catch (error) {
    console.error('Error fetching all games:', error)
    return []
  }
}

async function fetchGameStudios(page: number) {
  try {
    const pageSize = 40
    const gameStudiosReq = await axios.get(
      `https://api.rawg.io/api/developers?key=${process.env.RAWG_API_KEY}&page=${page}&page_size=${pageSize}`
    )
    const gameStudios: GameStudioFromRAWG[] = gameStudiosReq.data.results
    return gameStudios
  } catch (error) {
    console.error('Error fetching game studios:', error)
    return []
  }
}
