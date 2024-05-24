import JWT from '@/lib/ui/api-client/auth'
import Input from 'components/Input'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import router from 'next/router'
import classNames from '@/lib/utils/classNames'
import { signIn } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import isAuth from '@/lib/backend/utils/isAuth'
import { NotificationContext, NotificationType } from '@/modules/contexts/NotificationContext'

const Login = () => {
  const { triggerNotification } = useContext(NotificationContext)

  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')

  const isDisabled = !usernameOrEmail || !password

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await JWT.login({ usernameOrEmail, password })

      if (res.data.isVerificationRequired) {
        await JWT.sendCode(res.data.email)
        router.push(`verify?email=${res.data.email}`)
        return
      }

      router.push('/home')
    } catch (error: any) {
      console.log(error)
      triggerNotification('', error.response.data.message, NotificationType.Error, 5000)
    }
  }

  const handleUsernameOrEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUsernameOrEmail(event.target.value)

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value)

  const handleSignInWithGoogle = async () => {
    try {
      signIn('google')
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const onSignUpClick = () => router.push('signup')
  return (
    <div className="space-y-4">
      <p className="text-4xl font-extrabold">Log in</p>

      <div>
        <p className="text-xl font-bold">Welcome back!</p>
        <p>Continue your journey with us</p>
      </div>
      <form className="w-80 flex-col space-y-4" onSubmit={handleSubmit}>
        <Input type="text" placeholder="Username or email" onChange={handleUsernameOrEmailChange} />
        <Input type="password" placeholder="Password" onChange={handlePasswordChange} />
        <button
          className={classNames(
            'w-full bg-red hover:bg-lightRed px-4 py-2 rounded-md',
            isDisabled && 'opacity-30'
          )}
        >
          Log in
        </button>
      </form>
      <div className="w-80 text-center">
        <div onClick={onSignUpClick} className="text-sm cursor-pointer">
          Don't have an account? Sign up
        </div>
        <div className="cursor-pointer" onClick={handleSignInWithGoogle}>
          Continue with Google
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const isUserSingedIn = await isAuth(context)

  if (isUserSingedIn) return { redirect: { permanent: false, destination: '/home' } }

  return {
    props: {}
  }
}

export default Login
