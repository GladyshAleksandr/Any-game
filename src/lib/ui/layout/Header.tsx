import Profile from '@icons/Profile.svg'
import Burger from '@icons/Burger.svg'
import Close from '@icons/Close.svg'
import SignOut from '@icons/SignOut.svg'
import Notification from '@icons/Notification.svg'
import AnyGameLogo from './components/AnyGameLogo'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut() // Replace 'google' with the name of your OAuth provider
    } catch (error) {
      console.error('Error signing in:', error)
      // Handle any errors that occur during sign-in
    }
  }

  const handleProfile = () => router.push('/user/profile')

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="flex flex-row justify-between items-center mb-10">
      <AnyGameLogo />
      <div className="xxs:hidden md:flex flex-1 flex-row justify-end items-center space-x-4">
        <div className="cursor-pointer">Rate Game</div>
        <div className="cursor-pointer">Future Updates</div>
        <Notification className="cursor-pointer" />
        <Profile className="cursor-pointer" onClick={handleProfile} />
        <SignOut className="cursor-pointer" onClick={handleSignOut} />
      </div>
      {/* <img src={'/icons/Burger.svg'}/> */}
      <div className="relative">
        <Burger className={'md:hidden'} onClick={handleToggle} />
        {isOpen && (
          <div className="absolute z-10 right-0 top-0 w-80 h-96 rounded-xl bg-white text-black">
            <div className="flex flex-col m-4 space-y-2 ">
              <div className="flex justify-between items-center">
                <div>My Lybrary</div>
                <Close className="w-10 h-10" onClick={handleToggle} />
              </div>
              <div className="flex justify-between items-center">
                <div>Rate Game</div>
                <Profile className="bg-black text-white p-2 rounded-full w-10 h-10 " />
              </div>
              <div className="flex justify-between items-center">
                <div>Future Updates</div>
                <Notification className="bg-black text-white p-2 rounded-full w-10 h-10" />
              </div>
              <div className="flex justify-between items-center">
                <div></div>
                <SignOut className="bg-black p-2 rounded-full w-10 h-10" onClick={handleSignOut} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
