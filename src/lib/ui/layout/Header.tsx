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
import Search from '@icons/Search.svg'
import { GameCriteria } from '../api-client/home'

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

  const hanleGenres = (slug: string) => {
    router.push(`/home?type=${GameCriteria.genre}&slug=${slug}`)
  }

  const handleTags = (slug: string) => {
    router.push(`home?type=${GameCriteria.tag}&slug=${slug}`)
  }

  const handlePlatforms = (slug: string) => {
    router.push(`/home?type=${GameCriteria.parentPlatform}&slug=${slug}`)
  }

  return (
    <div className="flex justify-between items-center mb-10">
      <AnyGameLogo />
      <div className="flex justify-center items-center xxs:space-x-2 xsm:space-x-4 sm:space-x-10">
        <FindByOption header="Genres" options={data.genres} onClick={hanleGenres} />
        <FindByOption header="Tags" options={data.tags} onClick={handleTags} />
        <FindByOption header="Platforms" options={data.platforms} onClick={handlePlatforms} />
        <Search className="text-white w-8 h-8 xxs:hidden xsm:flex" />
        <div ref={menuRef} className="relative">
          <div onClick={handleToggle}>
            <Avatar user={data.user as any} className="w-8 h-8 xs:w-10 xs:h-10" />
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
  onClick: (slug: string) => void
}

const FindByOption = ({ header, options, onClick }: FindByOptionType) => {
  const menuRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen((prevState) => !prevState)

  UseClickOutside(menuRef, isOpen, () => setIsOpen(false))

  return (
    <div ref={menuRef} className="cursor-pointer" onClick={handleToggle}>
      <p className="xsm:text-xl font-semibold">{header}</p>

      {isOpen && (
        <div
          className={classNames(
            'absolute grid xxs:grid-cols-1 xsm:grid-cols-2 sm:grid-cols-3 justify-items-center z-10 top-24 rounded-xl bg-gray max-h-100 p-2 overflow-y-auto',
            styles['show-scrollbar']
          )}
        >
          {options.map((option) => (
            <p
              key={option.slug}
              onClick={() => onClick(option.slug)}
              className="w-[calc(100%-1rem)] truncate rounded-md py-1 hover:bg-lightRed"
            >
              {option.name}
            </p>
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
