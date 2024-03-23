import axios from 'axios'
import { GameFromRawg } from '@/lib/backend/types/GameFromRawg'

async function fetchGames(page: number) {
  try {
    const pageSize = 40
    const gamesReq = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page=${page}&page_size=${pageSize}`
    )
    const games: GameFromRawg[] = gamesReq.data.results
    return games
  } catch (error) {
    console.error('Error fetching games:', error)
    return []
  }
}

export async function fetchAllGames() {
  let allGames: any = []
  let currentPage = 1
  const numberOfGames = 1000
  try {
    let nextPageGames = await fetchGames(currentPage)
    while (allGames.length < numberOfGames) {
      allGames = allGames.concat(nextPageGames)
      currentPage++ // Move to the next page
      nextPageGames = await fetchGames(currentPage)
    }
    return allGames as GameFromRawg[]
  } catch (error) {
    console.error('Error fetching all games:', error)
    return []
  }
}
