import axios from 'axios'
import Search from '@icons/Search.svg'
import { useEffect } from 'react'

type Results = {
  id: number
  name: string
  background_image: string
  rating_top: number
  parent_platforms: {
    platform: {
      name: string
    }
  }[]
  tags: {
    name: string
  }[]
}

type ComponentProps = {
  allGames: Array<Results>
}
const Home = ({ allGames }: ComponentProps) => {
  console.log('allGames', allGames)
  return (
    <div className="flex justify-center">
      <div className="flex flex-row justify-between w-1/2 rounded-md bg-white max-w-full px-4 py-3">
        <div className="flex flex-row items-center space-x-1">
          <Search />
          <input
            type="text"
            className="outline-none text-black placeholder-black"
            placeholder="Search"
          ></input>
        </div>
        <button className="bg-red-500 px-4 py-2 rounded-md">Filter</button>
      </div>
      <div></div>
    </div>
  )
}

export async function getServerSideProps() {
  const allGamesReq = await axios.get(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`
  )

  const allGames = allGamesReq.data.results

  return {
    props: {
      allGames
    }
  }
}

export default Home
