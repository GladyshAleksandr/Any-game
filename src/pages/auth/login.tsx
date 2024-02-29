import JWT from '@/lib/ui/api-client/auth/jwt'
import Input from 'components/Input'
import { ChangeEvent, FormEvent, useState } from 'react'
import router from 'next/router'
import classNames from '@/lib/utils/classNames'

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
        <div onClick={onSignUpClick} className="text-center text-sm cursor-pointer">
          Don't have an account? Sign up
        </div>
      </form>
    </div>
  )
}

export default Login
