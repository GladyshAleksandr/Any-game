import classNames from '@/lib/utils/classNames'
import { User } from '@prisma/client'

type ComponentProps = {
  user: User
  className?: string
}

const Avatar = ({ user, className }: ComponentProps) => {
  const noImageClassnames = classNames(
    'flex justify-center items-center text-4xl font-bold bg-[#d3d3d3] text-gray rounded-2xl w-12 h-12',
    className || ''
  )

  if (!user.id) return <div className={noImageClassnames}>?</div>
  return (
    <>
      {user.profileImage ? (
        <img
          src={user.profileImage}
          className={classNames('rounded-2xl w-12 h-12', className || '')}
        ></img>
      ) : (
        <div className={noImageClassnames}>
          {user.name ? user.name[0].toLocaleUpperCase() : user.username[0].toLocaleUpperCase()}
        </div>
      )}
    </>
  )
}

export default Avatar
