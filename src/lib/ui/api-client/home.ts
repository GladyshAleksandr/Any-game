import axios from 'axios'

const games = async (page: number) => axios.get(`/api/home?page=${page}`)

const HomeAPI = {
  games
}

export default HomeAPI
