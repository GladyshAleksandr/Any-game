import { userFromSessionOrJWT } from '@/lib/backend/repositories/user.repository'
import serializeData from '@/lib/backend/utils/serializeData'
import prisma from '@/lib/prisma'
import UserShell from '@/lib/ui/shells/UserShell'
import classNames from '@/lib/utils/classNames'
import { UserGameData } from '@/modules/game/components/molecules/UserGameActions'
import GameCards from '@/modules/home/components/molecules/GameCards'
import { GameExtended } from '@/types/types'
import { GameStatus, User, UserGameStatus } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

type UserWithGames = User & {
  games: UserGameStatus & { game: GameExtended }[]
}

type ComponentProps = {
  user: UserWithGames
}

const GameList = ({ user }: ComponentProps) => {
  const router = useRouter()

  console.log('router query', router.query.status)

  const handleClick = (status?: GameStatus) => {
    status ? router.push(`game-list?status=${status}`) : router.push('game-list')
  }

  const modifiedUserGameData = [{ value: undefined, text: 'All' }, ...UserGameData]

  return (
    <UserShell user={user}>
      <div className="space-y-12">
        <div className="flex justify-center xxs:space-x-4  xsm:space-x-16 text-lg font-medium">
          {modifiedUserGameData.map((el, index) => (
            <div
              key={index}
              className={classNames(
                'text-center hover:underline decoration-red underline-offset-4 cursor-pointer',
                router.query.status === el.value && 'underline'
              )}
              onClick={() => handleClick(el.value)}
            >
              {el.text}
            </div>
          ))}
        </div>
        <GameCards games={user.games.map((el) => el.game)} />
      </div>
    </UserShell>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { status } = context.query

  const user = await userFromSessionOrJWT(context)

  if (!user) return { redirect: { permanent: false, destination: '/auth/login' } }

  const mUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      games: {
        where: {
          status: status as GameStatus
        },
        include: {
          game: {
            include: {
              esrbRating: true,
              parentPlatforms: true,
              genres: true,
              tags: true
            }
          }
        }
      }
    }
  })

  const serializedUser = serializeData(mUser)

  return {
    props: {
      user: serializedUser
    }
  }
}

export default GameList
