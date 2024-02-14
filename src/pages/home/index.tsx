import getGames from '@/lib/backend/utils/getGames'
import Search from '@icons/Search.svg'
import { Game } from '@prisma/client'
import { useState } from 'react'

type ComponentProps = {
  games: Game[]
}
const Home = ({ games }: ComponentProps) => {
  const [page, setPage] = useState<number>(1)
  console.log('games', games)
  return (
    <div>
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
      </div>
      <div className="grid grid-cols-5 gap-4 mt-10">
        {games.map((game) => (
          <div className="bg-[#1b1b1b]">
            <img
              className=""
              src={game.backgroundImage} // Path to your image in the public directory
              alt="Description of the image"
              width={500} // Width of the image (in pixels)
              height={300} // Height of the image (in pixels)
            />
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const games = await getGames()

  return {
    props: {
      games
    }
  }
}

export default Home
