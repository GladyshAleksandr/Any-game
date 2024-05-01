import { userFromSessionOrJWT } from '@/lib/backend/repositories/user.repository'
import serializeData from '@/lib/backend/utils/serializeData'
import prisma from '@/lib/prisma'
import classNames from '@/lib/utils/classNames'
import GameScreeenshots from '@/modules/game/components/molecules/GameScreenshots'
import UserGameActions from '@/modules/game/components/molecules/UserGameActions'
import Carousel from '@/modules/game/components/organisms/Carousel'
import { GameExtended } from '@/types/types'
import { GameStatus, Rating, UserGameStatus } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import styles from '@/styles/scrollbar.module.css'
import { Rating as StarRating } from 'react-simple-star-rating'
import { Colors } from '@/lib/ui/constants/Colors'
import rate from '@/lib/ui/api-client/rate'
import handleRedirectResponse from '@/lib/backend/utils/handleRedirectResponse'
import CommentsSection from '@/modules/game/components/molecules/CommentsSection'

type UserFromDb = {
  id: number
  games: UserGameStatus[]
  ratings: Rating[]
}

type ComponentProps = {
  game: GameExtended
  user: UserFromDb
}
const Game = ({ game, user }: ComponentProps) => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<number | null>(null)
  const [userGameStatus, setUserGameStatus] = useState<GameStatus | null>(
    (user && user.games.find((el) => el.gameId === game.id))?.status || null
  )

  const initialRating = user ? (user.ratings.length > 0 ? user.ratings[0].rating : 0) : 0 //TODO metactitic
  const [rating, setRating] = useState(initialRating)

  const handleRating = async (rating: number) => {
    try {
      const res = await rate(rating, game.id)
      setRating(res.data.ratingRaw.rating)
    } catch (error) {
      handleRedirectResponse(error)
    }
  }

  const onPointerEnter = () => null
  const onPointerLeave = () => null
  const onPointerMove = (value: number, index: number) => null

  // TODO Comments UI improovements & pc_requirements

  // TODO Improove Carousel UI 4

  return (
    <div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 md:h-full xl:h-[400px] gap-6">
        <div className="flex flex-col items-center">
          <img
            onClick={() => setSelectedScreenshot(0)}
            className={'object-cover rounded-2xl cursor-pointer w-[420px] h-60'}
            src={game.backgroundImage}
          />
          <div className="flex flex-col items-center mt-4">
            <div className="flex flex-col h-auto">
              <StarRating
                initialValue={rating}
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
              userGameStatus={userGameStatus}
              setUserGameStatus={setUserGameStatus}
            />
          </div>
        </div>
        <div
          className={classNames(
            'max-h-[400px] overflow-y-auto xxs:order-3 md:col-span-2 xl:order-2 xl:col-span-1 flex flex-col space-y-4',
            styles['show-scrollbar']
          )}
        >
          <p className="text-xl font-extrabold">{game.name}</p>
          <pre className="text-base font-sans" style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.parse(game.description || '')}
          </pre>
        </div>
        <GameScreeenshots game={game} setSelectedScreenshot={setSelectedScreenshot} />
      </div>
      <CommentsSection userId={user?.id} gameId={game.id} gameComments={game.comments} />

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
      tags: true,
      comments: {
        include: {
          user: true,
          commentActions: true
        }
      }
    }
  })

  const authUser = await userFromSessionOrJWT(context)

  const user =
    authUser &&
    (await prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        games: true,
        ratings: {
          where: {
            userId: authUser.id,
            gameId: game?.id
          }
        }
      }
    }))

  const serializedGame = serializeData(game)
  const serializedUser = serializeData(user)

  return {
    props: {
      game: serializedGame,
      user: serializedUser
    }
  }
}

export default Game
