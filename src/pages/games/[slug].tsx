import serializeData from '@/lib/backend/utils/serializeData'
import prisma from '@/lib/prisma'
import GameScreeenshots from '@/modules/game/components/molecules/GameScreenshots'
import UserGameActions from '@/modules/game/components/molecules/UserGameActions'
import Carousel from '@/modules/game/components/organisms/Carousel'
import { GameExtended } from '@/types/types'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { useState } from 'react'

type GameType = {
  game: GameExtended
  gameReq: any
}
const Game = ({ game, gameReq }: GameType) => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<number | null>(null)
  console.log('gameReq', gameReq)
  // TODO improove carousel UI 4

  return (
    <div>
      <div className="flex space-x-6">
        <Image
          onClick={() => setSelectedScreenshot(0)}
          className={'object-cover rounded-2xl cursor-pointer'}
          src={game.backgroundImage}
          alt=""
          width={384}
          height={384}
          priority
        />
        <div className="flex-grow">
          <div>
            <p className="text-xl font-extrabold">{game.name}</p>
          </div>
          <div>{gameReq.description_raw}</div>
        </div>
        <GameScreeenshots game={game} setSelectedScreenshot={setSelectedScreenshot} />
      </div>
      <div>
        <UserGameActions />
      </div>
      <Carousel
        game={game}
        selectedScreenshot={selectedScreenshot}
        setSelectedScreenshot={setSelectedScreenshot}
      />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = Array.isArray(context.params?.slug) ? context.params?.slug[0] : context.params?.slug
  const game = await prisma.game.findUnique({
    where: {
      slug: slug
    },
    include: {
      esrbRating: true,
      parentPlatforms: true,
      genres: true,
      tags: true
    }
  })

  const serializedGame = serializeData(game)

  // const gamesReq = await axios.get(
  //   `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page=${page}&page_size=${pageSize}`
  // )

  // const gameReq = await axios.get(
  //   `https://api.rawg.io/api/games/${1}?key=${process.env.RAWG_API_KEY}`
  // )
  // const gameReq = await axios.get(
  //   `https://api.rawg.io/api/games/${3328}/game-series?key=${process.env.RAWG_API_KEY}`
  // )

  const gameReq = await axios.get(
    `https://api.rawg.io/api/developers?key=${process.env.RAWG_API_KEY}`
  )

  return {
    props: {
      game: serializedGame,
      gameReq: serializeData(gameReq.data)
    }
  }
}

export default Game
