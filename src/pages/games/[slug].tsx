import { userFromSessionOrJWT } from '@/lib/backend/repositories/user.repository'
import serializeData from '@/lib/backend/utils/serializeData'
import prisma from '@/lib/prisma'
import classNames from '@/lib/utils/classNames'
import GameScreeenshots from '@/modules/game/components/molecules/GameScreenshots'
import UserGameActions from '@/modules/game/components/molecules/UserGameActions'
import Carousel from '@/modules/game/components/organisms/Carousel'
import { GameExtended } from '@/types/types'
import { UserGameStatus } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import styles from '@/styles/scrollbar.module.css'
import axios from 'axios'
import { Rating } from 'react-simple-star-rating'
import { Colors } from '@/lib/ui/constants/Colors'

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
  const [rating, setRating] = useState(0)

  const handleRating = (rate: number) => {
    setRating(rate)
  }

  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value: number, index: number) => console.log('onPointerMove', value)

  // TODO improove carousel UI 4

  const text =
    "The year is 2021, and Genoq has become a leading corporation in bio-medical research. However the tower, some 90 stories high, is not all that it seems. Somewhere within the tower, highly illegal bio-weapons research has been conducted in secret. June 26th, disaster strikes and the lethal organic weapons have escaped and threaten not only the staff members stranded in the tower, but the world itself. <br/><br/>You arrive on the 80th floor with an urgent package addressed to Derrida, the lead scientist at Genoq working on the bio-weapons research. Set back from your goal, you must climb the tower, assisting those in need or focusing solely on your task at hand, and stopping the virus from escaping the tower and threatening all life on the planet.<br/><br/>Will you help the stranded survivors or hinder them? Can you deliver the package to Derrida in time? Can you prevent the impending catastrophe and escape with your life?<br/><br/>Key Features<br/><ul><li> New high res graphics<br/></li><li> New music by Mark 'TDK' Knight<br/></li><li> New control menu<br/></li><li> Can save at any point in the game<br/></li><li> Leaderboards<br/></li><li> Achievements<br/></li><li> Same great gameplay</li></ul>"

  return (
    <div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 md:h-full xl:h-[400px] gap-6">
        <div className="flex flex-col items-center">
          <img
            onClick={() => setSelectedScreenshot(0)}
            className={'object-cover rounded-2xl cursor-pointer'}
            src={game.backgroundImage}
          />
          <div className="flex flex-col items-center mt-4">
            <div className="flex flex-col h-auto">
              <Rating
                initialValue={undefined}
                onClick={handleRating}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                iconsCount={10}
                size={30}
                SVGclassName="inline-block"
                emptyColor={Colors.SILVER}
                fillColor={Colors.GOLD}
                allowFraction
              />
            </div>
            <UserGameActions
              gameId={game.id}
              currentUserGameAction={currentUserGameAction}
              setCurrentUserGameAction={setCurrentUserGameAction}
            />
          </div>
        </div>
        <div
          className={classNames(
            'max-h-[400px] overflow-y-auto xxs:order-3 md:col-span-2 xl:order-2 xl:col-span-1 flex flex-col space-y-2',
            styles['show-scrollbar']
          )}
        >
          <p className="text-xl font-extrabold">{game.name}</p>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
        <GameScreeenshots game={game} setSelectedScreenshot={setSelectedScreenshot} />
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

  const gameDetails = await axios.get(
    `https://api.rawg.io/api/games/${1}?key=${process.env.RAWG_API_KEY}`
  )

  console.log('___gameDetails___', gameDetails)

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
