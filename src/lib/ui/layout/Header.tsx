import Profile from '@icons/Profile.svg'
import Notification from '@icons/Notification.svg'

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center bg-red-300">
      <div className="font-archivo text-2xl leading-6">
        <p>Any</p>
        <p>Game</p>
      </div>
      <div className="flex flex-row space-x-4 bg-blue-300">
        <div></div>
        <Notification />
        <Profile />
      </div>
    </div>
  )
}

export default Header
