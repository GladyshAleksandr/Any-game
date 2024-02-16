import getGames from '@/lib/backend/utils/getGames'
import { GameExtended } from '@/types/types'
import Search from '@icons/Search.svg'
import { useState } from 'react'
import Image from 'next/image'

type ComponentProps = {
  games: GameExtended[]
}

// enum Platforms {
//   PC = 'pc',
//   PlayStation = 'playstation',
//   XBox = 'xbox',
//   Nintendo,
//   Mac,
//   Linux,
//   Ios,
//   Android,
//   Web,
//   Sega
// }

const getPlatformImg = (slug: string) => {
  switch (slug) {
    case 'pc':
      return '/icons/PC.svg'

    case 'playstation':
      return '/icons/PlayStation.svg'

    case 'xbox':
      return '/icons/Xbox.svg'

    case 'mac':
      return '/icons/Mac.svg'

    case 'nintendo':
      return '/icons/Nintendo.svg'

    case 'linux':
      return '/icons/Linux.svg'

    case 'android':
      return '/icons/Android.svg'

    case 'ios':
      return '/icons/IOS.svg'

    case 'web':
      return '/icons/Web.svg'

    case 'sega':
      return '/icons/Sega.svg'

    default:
      return ''
  }
}

const getColorFromRating = (rating: number) => {
  if (rating <= 50) return '#808000' // olive
  if (rating <= 80) return '#cccccc' // silver
  if (rating <= 90) return '#ffd900' // gold
  if (rating <= 100) return '#03fff7' //Diamond #b9f2ff
}

const Home = ({ games }: ComponentProps) => {
  const [page, setPage] = useState<number>(1)

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
          <div key={game.id} className="bg-[#1b1b1b] w-30 h-64 rounded-2xl">
            <img
              className="object-cover w-full h-40 rounded-2xl"
              src={game.backgroundImage} // Path to your image in the public directory
              alt="Description of the image"
            />
            <div className="px-3 mt-2">
              <div className="flex flex-row justify-between">
                <div className="flex space-x-1">
                  {game.parentPlatforms.map((platform) => (
                    <Image
                      key={platform.id}
                      alt={game.name}
                      src={getPlatformImg(platform.slug)}
                      height={18}
                      width={18}
                    />
                  ))}
                </div>
                {game.metacritic ? (
                  <p
                    style={{
                      color: getColorFromRating(game.metacritic),
                      borderColor: getColorFromRating(game.metacritic)
                    }}
                    className="border-2 rounded-md px-2 "
                  >
                    {game.metacritic}
                  </p>
                ) : (
                  <p>N/A</p>
                )}
              </div>
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
