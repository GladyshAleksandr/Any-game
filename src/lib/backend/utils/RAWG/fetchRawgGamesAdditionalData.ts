import axios from 'axios'
import { GameFromRawg } from '@/lib/backend/types/GameFromRawg'

type GameWithDescription = GameFromRawg & { description_raw: string }
type GameWithTrailers = GameFromRawg & { trailers: string[] }

const fetchRawgGamesAdditionalData = async (games: GameFromRawg[]) => {
  const gamesWithDescription = await addGamesDescription(games)
  const gamesWithTrailers = await addGamesTrailers(gamesWithDescription)

  const finalGamesResult = null

  return finalGamesResult
}

export default fetchRawgGamesAdditionalData

const addGamesDescription = async (games: GameFromRawg[]) => {
  const gamesWithDescription = await Promise.all(
    games.map(async (game) => {
      const gameDetails = await axios.get(
        `https://api.rawg.io/api/games/${game.id}?key=${process.env.RAWG_API_KEY}`
      )
      return { ...game, description_raw: gameDetails.data.description_raw } as GameWithDescription
    })
  )

  return gamesWithDescription
}

const addGamesTrailers = async (games: GameWithDescription[]) => {
  const gamesWithTrailers = await Promise.all(
    games.map(async (game) => {
      const gameTrailers = await axios.get(
        `https://api.rawg.io/api/games/${game.id}/movies?key=${process.env.RAWG_API_KEY}`
      )
      return {
        ...game,
        trailers: gameTrailers.data.results.map((el: any) => el.data.max)
      } as GameWithTrailers
    })
  )

  return gamesWithTrailers
}

const addGamesPartOfSeries = async (games: GameWithDescription[]) => {
  const gamesWithPartOfSeries = await Promise.all(
    games.map(async (game) => {
      const gamePartOfSeries = await axios.get(
        `https://api.rawg.io/api/games/${game.id}/game-series?key=${process.env.RAWG_API_KEY}`
      )
      return {
        ...game,
        games: gamePartOfSeries.data.results
      }
    })
  )

  return gamesWithPartOfSeries
}
