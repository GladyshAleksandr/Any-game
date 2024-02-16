import getColorFromRating from '@/lib/ui/utils/getColorFromRating'
import getPlatformImg from '@/lib/ui/utils/getPlatformImg'
import Image from 'next/image'
import { GameExtended } from '@/types/types'
import { useRouter } from 'next/router'

type GameCardType = {
  games: GameExtended[]
}

const GameCards = ({ games }: GameCardType) => {
  const router = useRouter()

  return (
    <div className="grid grid-cols-5 gap-4 mt-10">
      {games.map((game) => (
        <div
          key={game.id}
          className="bg-[#1b1b1b] w-30 h-64 rounded-2xl cursor-pointer"
          onClick={() => {
            router.push('games/' + game.slug)
          }}
        >
          <img
            className="object-cover w-full h-40 rounded-2xl"
            src={game.backgroundImage} // Path to your image in the public directory
            alt="Description of the image"
          />
          <div className="px-3 mt-2 ">
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
            <p className="mt-2 text-lg font-bold">{game.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GameCards
