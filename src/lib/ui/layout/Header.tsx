import Profile from '@icons/Profile.svg'
import GameList from '@icons/GameList.svg'
import Notification from '@icons/Notification.svg'
import AnyGameLogo from './components/AnyGameLogo'
import SignOut from '@icons/SignOut.svg'
import { signOut } from 'next-auth/react'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import UseClickOutside from '../utils/useClickOutside'
import { SessionJwtUserType } from '@/lib/backend/repositories/user.repository'
import Avatar from 'components/ui/Avatar'
import classNames from '@/lib/utils/classNames'
import styles from '@/styles/scrollbar.module.css'

type OptType = {
  name: string
  slug: string
}

export type HeaderOptionsType = {
  user: SessionJwtUserType
  genres: OptType[]
  tags: OptType[]
  platforms: OptType[]
}

const Header = ({ data }: { data: HeaderOptionsType }) => {
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

  const hanleGenres = () => {}

  const handleTags = () => {}

  const handlePlatforms = () => {}

  return (
    <div className="flex flex-row justify-between items-center mb-10">
      <AnyGameLogo />
      <div className="flex justify-center items-center space-x-10">
        <FindByOption header="Genres" options={data.genres} />
        <FindByOption header="Tags" options={data.tags} />
        <FindByOption header="Platforms" options={data.platforms} />
        <div ref={menuRef} className="relative">
          <div onClick={handleToggle}>
            <Avatar user={data.user as any} className="w-10 h-10" />
          </div>
          {isOpen && (
            <div className="absolute py-4 w-52 bg-gray space-y-2 rounded-xl top-14 right-0 text-sm">
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

type FindByOptionType = {
  header: string
  options: OptType[]
}

const FindByOption = ({ header, options }: FindByOptionType) => {
  const menuRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen((prevState) => !prevState)

  UseClickOutside(menuRef, isOpen, () => setIsOpen(false))

  return (
    <div ref={menuRef} className="relative cursor-pointer" onClick={handleToggle}>
      <p className="text-xl font-semibold">{header}</p>

      {isOpen && (
        <div
          className={classNames(
            'absolute grid grid-cols-2 z-10 top-10 left-0 rounded-xl bg-gray w-72 max-h-100 px-4 overflow-y-auto',
            styles['show-scrollbar']
            // widerSubOption ? 'grid-cols-3 w-80' : 'w-full' //TODO
          )}
        >
          {options.map((option) => (
            <p className="w-[calc(100%-1rem)] truncate text-sm">{option.name}</p>
          ))}
        </div>
      )}
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
