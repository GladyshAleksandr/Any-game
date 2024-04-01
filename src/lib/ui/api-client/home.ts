import axios from 'axios'

export enum GameCriteria {
  genre = 'genre',
  tag = 'tag',
  parentPlatform = 'parentPlatform'
}

const games = (page: number, type?: GameCriteria, slug?: string) => {
  let url = `/api/home?page=${page}`

  if (slug && type) {
    url += `&type=${type}&slug=${slug}`
  }

  return axios.get(url)
}

const HomeAPI = {
  games
}

export default HomeAPI
