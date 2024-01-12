import Profile from '@icons/Profile.svg'
import Notification from '@icons/Notification.svg'
import AnyGameLogo from './components/AnyGameLogo'

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center mb-10">
      <AnyGameLogo />
      <div className="flex flex-row items-center space-x-4">
        <div>Rate Game</div>
        <div>Future Updates</div>
        <Notification />
        <Profile />
      </div>
    </div>
  )
}

export default Header
