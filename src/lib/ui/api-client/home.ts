import axios from 'axios'

export enum GameCriteria {
  genre = 'genre',
  tag = 'tag',
  parentPlatform = 'parentPlatform'
}

const games = (page: number, type?: GameCriteria, slug?: string) =>
  axios.get(`/api/home?page=${page}&type=${type}&slug=${slug}`)

const HomeAPI = {
  games
}

export default HomeAPI
