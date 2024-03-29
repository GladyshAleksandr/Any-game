import { User } from '@prisma/client'

const Avatar = ({ user }: { user: User }) => {
  return (
    <>
      {user.profileImage ? (
        <img src={user.profileImage} className="rounded-2xl w-12 h-12"></img>
      ) : (
        <div className="flex justify-center items-center text-4xl font-bold bg-[#d3d3d3] text-gray rounded-2xl w-12 h-12">
          {user.name ? user.name[0].toLocaleUpperCase() : user.username[0].toLocaleUpperCase()}
        </div>
      )}
    </>
  )
}

export default Avatar
