import { GameStatus } from '@prisma/client'
import axios from 'axios'

const create = async (gameId: number, status: GameStatus) =>
  axios.post(`api/user-game-status`, { gameId, status })

const update = async (id: number, status: GameStatus) =>
  axios.post(`api/user-game-status/${id}`, { status })

const destroy = async (gameId: number) => axios.delete(`api/user-game-status/${gameId}`)

const UserGameStatus = {
  create,
  update,
  destroy
}

export default UserGameStatus
