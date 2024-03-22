import getColorFromRating from '@/lib/ui/utils/getColorFromRating'
import getPlatformImg from '@/lib/ui/utils/getPlatformImg'
import { GameExtended } from '@/types/types'
import { useRouter } from 'next/router'

type GameCardType = {
  games: GameExtended[]
}

const GameCards = ({ games }: GameCardType) => {
  const router = useRouter()

  return (
    <div className="grid sm:grid-cols-2 mdlg:grid-cols-3 1xl:grid-cols-4 gap-4">
      {games.map((game) => (
        <div
          key={game.id}
          className="flex flex-col space-y-4 bg-[#1b1b1b] rounded-2xl cursor-pointer"
          onClick={() => {
            router.push('games/' + game.slug)
          }}
        >
          <img
            className="object-cover rounded-2xl"
            src={game.backgroundImage} // Path to your image in the public directory
            alt="Description of the image"
          />
          <div className="px-3 mt-2 ">
            <div className="flex flex-row justify-between items-center">
              <div className="flex space-x-1">
                {game.parentPlatforms.map((platform) => (
                  <img
                    className="w-5 h-5"
                    key={platform.id}
                    alt={game.name}
                    src={getPlatformImg(platform.slug)}
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
