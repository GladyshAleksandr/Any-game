import { UserGameStatus } from '@prisma/client'
import axios from 'axios'

const create = async (status: UserGameStatus) => axios.post('api/user-game-status', status)

const destroy = async (gameId: number) => axios.delete(`api/user-game-status/${gameId}`)

const update = async (gameId: number, status: UserGameStatus) =>
  axios.post(`api/game_user_status/${gameId}`, status)

const UserGameStatus = {
  create,
  destroy,
  update
}

export default UserGameStatus
