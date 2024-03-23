import handleRedirectResponse from '@/lib/backend/utils/handleRedirectResponse'
import UserGameStatusAPI from '@/lib/ui/api-client/user_game_status'
import { GameStatus } from '@prisma/client'
import OptionButton from 'components/ui/OptionButton'
import { Dispatch, SetStateAction } from 'react'

type ComponentProps = {
  gameId: number
  userGameStatus?: GameStatus | null
  setUserGameStatus: Dispatch<SetStateAction<GameStatus | null>>
}

const UserGameActions = ({ gameId, userGameStatus, setUserGameStatus }: ComponentProps) => {
  const userGameActions = Object.values(GameStatus).map((status) => ({
    value: status
  }))

  const handleOnClick = async (status: GameStatus) => {
    try {
      if (!userGameStatus) {
        const { data } = await UserGameStatusAPI.create(gameId, status)
        setUserGameStatus(data.status)
        return
      }
      if (userGameStatus === status) {
        await UserGameStatusAPI.destroy(gameId)
        setUserGameStatus(null)
        return
      }
      const { data } = await UserGameStatusAPI.update(gameId, status)

      setUserGameStatus(data.status)
    } catch (error: any) {
      handleRedirectResponse(error)
    }
  }

  const text = (status: GameStatus) => {
    switch (status) {
      case GameStatus.PLAYING:
        return 'Playing'
      case GameStatus.BEATEN:
        return 'Beaten'
      case GameStatus.DROPPED:
        return 'Dropped'
      case GameStatus.TO_PLAY:
        return 'To play'
    }
  }
  return (
    <div className="grid grid-cols-2 mt-4 gap-4">
      {userGameActions.map((el, index) => (
        <OptionButton key={index} className="border-2" onClick={() => handleOnClick(el.value)}>
          {text(el.value)}
        </OptionButton>
      ))}
    </div>
  )
}

export default UserGameActions
