import { userFromSessionOrJWT } from '@/lib/backend/repositories/user.repository'
import serializeData from '@/lib/backend/utils/serializeData'
import prisma from '@/lib/prisma'
import GameScreeenshots from '@/modules/game/components/molecules/GameScreenshots'
import UserGameActions from '@/modules/game/components/molecules/UserGameActions'
import Carousel from '@/modules/game/components/organisms/Carousel'
import { GameExtended } from '@/types/types'
import { UserGameStatus } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { useState } from 'react'

type UserFromDb = {
  id: number
  games: UserGameStatus[]
}

type ComponentProps = {
  game: GameExtended
  user: UserFromDb
}
const Game = ({ game, user }: ComponentProps) => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<number | null>(null)
  const [currentUserGameAction, setCurrentUserGameAction] = useState<UserGameStatus | null>(
    (user && user.games.find((el) => el.gameId === game.id)) || null
  )
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
        </div>
        <GameScreeenshots game={game} setSelectedScreenshot={setSelectedScreenshot} />
      </div>
      <div>
        <UserGameActions
          gameId={game.id}
          currentUserGameAction={currentUserGameAction}
          setCurrentUserGameAction={setCurrentUserGameAction}
        />
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

  const authUser = await userFromSessionOrJWT(context)

  const user =
    authUser &&
    (await prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        games: true
      }
    }))

  const serializedGame = serializeData(game)
  return {
    props: {
      game: serializedGame,
      user
    }
  }
}

export default Game
