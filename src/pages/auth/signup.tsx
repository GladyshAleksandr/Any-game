import JWT from '@/lib/ui/api-client/auth'
import classNames from '@/lib/utils/classNames'
import Input from 'components/Input'
import { GetServerSidePropsContext } from 'next'
import { getSession, signIn } from 'next-auth/react'
import router from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const isDisabled = !username || !email || !password || !confirmPassword
  //TODO Password handler

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await JWT.signup({ username, email, password })
      router.push('/home')
    } catch (error: any) {
      console.log(error)
      console.log(error.response.data.message)
    }
  }

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value)
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value)
  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(event.target.value)

  const onLoginClick = () => router.push('login')
  return (
    <div>
      <p className="text-4xl font-extrabold">Sign up</p>

      <div className="my-4">
        <p className="text-xl font-bold">Nice yo see you!</p>
        <p>Start your journey with us</p>
      </div>
      <form className="w-80 flex-col space-y-4" onSubmit={handleSubmit}>
        <Input type="text" placeholder="Email" onChange={handleEmailChange} />
        <Input type="text" placeholder="Username" onChange={handleUsernameChange} />
        <Input type="password" placeholder="Password" onChange={handlePasswordChange} />
        <Input
          type="password"
          placeholder="Confirm password"
          onChange={handleConfirmPasswordChange}
        />

        <button
          className={classNames(
            'w-full bg-red-500 px-4 py-2 rounded-md',
            isDisabled && 'opacity-30'
          )}
        >
          Log in
        </button>
        <div onClick={onLoginClick} className="text-center text-sm cursor-pointer">
          Don't have an account? Log in
        </div>
        <button onClick={() => signIn('google')}>Sign up with Google</button>
      </form>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session || context.req.cookies.token) {
    return { redirect: { permanent: false, destination: '/home' } }
  }

  return {
    props: {}
  }
}
export default SignUp
