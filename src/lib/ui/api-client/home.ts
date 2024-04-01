import axios from 'axios'

export enum GameCriteria {
  genre = 'genre',
  tag = 'tag',
  parentPlatform = 'parentPlatform',
  name = 'name'
}

const games = (page: number, type?: GameCriteria, value?: string) => {
  let url = `/api/home?page=${page}`

  if (type && value) {
    url += `&type=${type}&value=${value}`
  }

  return axios.get(url)
}

const HomeAPI = {
  games
}

export default HomeAPI
