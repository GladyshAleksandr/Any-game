import { userFromSessionOrJWT } from '@/lib/backend/repositories/user.repository'
import getGames from '@/lib/backend/utils/getGames'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

type ComponentProps = {
  children: any
  user: User
}

const UserShell = (props: ComponentProps) => {
  const router = useRouter()

  const handleProfile = () => router.push('profile')
  const handleGameList = () => router.push('game-list')
  const handleNotifications = () => router.push('notifications')

  return (
    <div className="flex flex-col items-center space-y-10">
      <p className="font-bold text-2xl">Hello {props.user.name || props.user.username}</p>
      <div className="w-full flex justify-evenly text-xl font-bold">
        <div className="cursor-pointer" onClick={handleProfile}>
          Profile
        </div>
        <div className="cursor-pointer" onClick={handleGameList}>
          Game list
        </div>
        <div className="cursor-pointer" onClick={handleNotifications}>
          Notifications
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default UserShell
