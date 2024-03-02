import Profile from '@icons/Profile.svg'
import Notification from '@icons/Notification.svg'
import AnyGameLogo from './components/AnyGameLogo'
import { signOut } from 'next-auth/react'

const Header = () => {
  const handleSignOut = async () => {
    try {
      await signOut() // Replace 'google' with the name of your OAuth provider
    } catch (error) {
      console.error('Error signing in:', error)
      // Handle any errors that occur during sign-in
    }
  }
  return (
    <div className="flex flex-row justify-between items-center mb-10">
      <AnyGameLogo />
      <div className="flex flex-row items-center space-x-4">
        <div>Rate Game</div>
        <div>Future Updates</div>
        <Notification />
        <Profile />
        <button onClick={handleSignOut}>Sign out with Google</button>
      </div>
    </div>
  )
}

export default Header
