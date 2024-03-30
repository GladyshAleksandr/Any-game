import Profile from '@icons/Profile.svg'
import GameList from '@icons/GameList.svg'
import Notification from '@icons/Notification.svg'
import Burger from '@icons/Burger.svg'
import AnyGameLogo from './components/AnyGameLogo'
import SignOut from '@icons/SignOut.svg'
import { signOut } from 'next-auth/react'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import UseClickOutside from '../utils/useClickOutside'

const Header = () => {
  const router = useRouter()

  const menuRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing in:', error)
    } finally {
      handleToggle()
    }
  }
  const handleProfile = () => {
    router.push('/user/profile')
    handleToggle()
  }

  const handleGameList = () => {
    router.push('/user/game-list')
    handleToggle()
  }

  const handleNotifications = () => {
    router.push('/user/notifications')
    handleToggle()
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  UseClickOutside(menuRef, isOpen, () => handleToggle())

  return (
    <div className="flex flex-row justify-between items-center mb-10">
      <AnyGameLogo />
      <div className="flex justify-center items-center space-x-10 text-xl font-semibold">
        <p className="cursor-pointer">Genres</p>
        <p className="cursor-pointer">Tags</p>
        <p className="cursor-pointer">Platforms</p>
        <div ref={menuRef} className="relative">
          <Profile
            className="xs:hidden md:flex cursor-pointer text-white w-8 h-8"
            onClick={handleToggle}
          />
          <Burger className={'md:hidden cursor-pointer'} onClick={handleToggle} />
          {isOpen && (
            <div className="absolute py-4 w-52 bg-gray space-y-2 rounded-xl top-10 right-0 text-sm">
              <MenuItem icon={Profile} text="Profile" onClick={handleProfile} />
              <MenuItem icon={GameList} text="Game List" onClick={handleGameList} />
              <MenuItem icon={Notification} text="Notifications" onClick={handleNotifications} />
              <MenuItem icon={SignOut} text="Log Out" onClick={handleSignOut} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type MenuItemProps = {
  icon: React.ElementType
  text: string
  onClick: () => void
}

const MenuItem = ({ icon: Icon, text, onClick }: MenuItemProps) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={onClick}>
      <Icon className={'bg-black text-white p-2 rounded-full w-10 h-10 ml-4'} />
      <p>{text}</p>
    </div>
  )
}

export default Header
