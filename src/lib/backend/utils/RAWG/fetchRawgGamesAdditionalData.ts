import axios from 'axios'
import { GameFromRawg } from '@/lib/backend/types/GameFromRawg'

const fetchRawgGamesAdditionalData = async (games: GameFromRawg[]) => {
  const gamesWithAdditionalData = addGamesDescription(games)

  return gamesWithAdditionalData
}

export default fetchRawgGamesAdditionalData

const addGamesDescription = (games: GameFromRawg[]) => {
  const gamesWithDescription = games.map(async (game) => {
    const gameDetails = await axios.get(
      `https://api.rawg.io/api/games/${game.id}?key=${process.env.RAWG_API_KEY}`
    )
    return { ...game, description_raw: gameDetails.data.description_raw }
  })

  return gamesWithDescription
}
