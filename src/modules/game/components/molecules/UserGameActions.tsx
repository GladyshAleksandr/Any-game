import handleRedirectResponse from '@/lib/backend/utils/handleRedirectResponse'
import UserGameStatusAPI from '@/lib/ui/api-client/user_game_status'
import { GameStatus, UserGameStatus } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'

type ComponentProps = {
  gameId: number
  currentUserGameAction?: UserGameStatus | null
  setCurrentUserGameAction: Dispatch<SetStateAction<UserGameStatus | null>>
}

const UserGameActions = ({
  gameId,
  currentUserGameAction,
  setCurrentUserGameAction
}: ComponentProps) => {
  const userGameActions = Object.values(GameStatus).map((status) => ({
    value: status
  }))
  console.log('currentUserGameAction', currentUserGameAction)
  const handleOnClick = async (status: GameStatus) => {
    try {
      if (!currentUserGameAction?.id) {
        const { data } = await UserGameStatusAPI.create(gameId, status)
        console.log('DATA__', data)
        setCurrentUserGameAction(data)
        return
      }
      if (currentUserGameAction.status === status) {
        await UserGameStatusAPI.destroy(currentUserGameAction.id)
        setCurrentUserGameAction(null)
        return
      }
      const { data } = await UserGameStatusAPI.update(currentUserGameAction.id, status)
      console.log('DATA__', data)

      setCurrentUserGameAction((prevState) => ({
        ...prevState!,
        status: data.status
      }))
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
    <div className="flex flex-col mt-4 space-y-2 bg-red-400">
      {userGameActions.map((el, index) => (
        <div
          key={index}
          onClick={() => handleOnClick(el.value)}
          className="w-40 h-10 flex items-center justify-center border-2 rounded-lg cursor-pointer "
        >
          {text(el.value)}
        </div>
      ))}
    </div>
  )
}

export default UserGameActions
