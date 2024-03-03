import JWT from '@/lib/ui/api-client/auth'
import Input from 'components/Input'
import { ChangeEvent, FormEvent, useState } from 'react'
import router from 'next/router'
import classNames from '@/lib/utils/classNames'
import { signIn } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import shouldRedirectFromLogin from '@/lib/backend/utils/shouldRedirectFromLogin'

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')

  const isDisabled = !usernameOrEmail || !password

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await JWT.login({ usernameOrEmail, password })
      router.push('/home')
    } catch (error: any) {
      console.log(error)

      console.log(error.response.data.message)
    }
  }

  const handleUsernameOrEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUsernameOrEmail(event.target.value)

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value)

  const handleSignIn = async () => {
    try {
      await signIn('google') // Replace 'google' with the name of your OAuth provider
    } catch (error) {
      console.error('Error signing in:', error)
      // Handle any errors that occur during sign-in
    }
  }

  const onSignUpClick = () => router.push('signup')
  return (
    <div>
      <p className="text-4xl font-extrabold">Log in</p>

      <div className="my-4">
        <p className="text-xl font-bold">Welcome back!</p>
        <p>Continue your journey with us</p>
      </div>
      <form className="w-80 flex-col space-y-4" onSubmit={handleSubmit}>
        <Input type="text" placeholder="Username or email" onChange={handleUsernameOrEmailChange} />
        <Input type="password" placeholder="Password" onChange={handlePasswordChange} />
        <button
          className={classNames(
            'w-full bg-red-500 px-4 py-2 rounded-md',
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
        <div className="cursor-pointer" onClick={handleSignIn}>
          Continue with Google
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const shouldRedirect = await shouldRedirectFromLogin(context)

  if (shouldRedirect) return { redirect: { permanent: false, destination: '/home' } }

  return {
    props: {}
  }
}

export default Login
