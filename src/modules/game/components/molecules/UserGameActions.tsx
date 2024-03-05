import { GameStatus } from '@prisma/client'

const UserGameActions = () => {
  const userGameActions = Object.values(GameStatus).map((status) => ({
    value: status
  }))

  const handleOnClick = (status: GameStatus) => {
    switch (status) {
      case GameStatus.PLAYING:
        return () => null
      case GameStatus.BEATEN:
        return () => null
      case GameStatus.DROPPED:
        return () => null
      case GameStatus.TO_PLAY:
        return () => null
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
          onClick={handleOnClick(el.value)}
          className="w-40 h-10 flex items-center justify-center border-2 rounded-lg cursor-pointer "
        >
          {text(el.value)}
        </div>
      ))}
    </div>
  )
}

export default UserGameActions
