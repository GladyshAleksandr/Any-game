import { GameStatus, UserGameStatus } from '@prisma/client'
import axios, { AxiosResponse } from 'axios'

const create = async (gameId: number, status: GameStatus): Promise<AxiosResponse<UserGameStatus>> =>
  axios.post(`/api/user_game_status`, { gameId, status })

const update = async (id: number, status: GameStatus): Promise<AxiosResponse<UserGameStatus>> =>
  axios.patch(`/api/user_game_status/${id}`, { status })

const destroy = async (gameId: number) => axios.delete(`/api/user_game_status/${gameId}`)

const UserGameStatusAPI = {
  create,
  update,
  destroy
}

export default UserGameStatusAPI
