import serializeData from '@/lib/backend/utils/serializeData'
import prisma from '@/lib/prisma'
import GameScreeenshots from '@/modules/game/components/molecules/GameScreenshots'
import UserGameActions from '@/modules/game/components/molecules/UserGameActions'
import Carousel from '@/modules/game/components/organisms/Carousel'
import { GameExtended } from '@/types/types'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { useState } from 'react'

type GameType = {
  game: GameExtended
}
const Game = ({ game }: GameType) => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<number | null>(null)

  // TODO improove carousel UI

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
        <div className="">
          <div>
            <p className="text-xl font-extrabold">{game.name}</p>
          </div>
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

  const serializedGames = serializeData(game)

  return {
    props: {
      game: serializedGames
    }
  }
}

export default Game
