import isAuth from '@/lib/backend/utils/isAuth'
import JWT from '@/lib/ui/api-client/auth'
import classNames from '@/lib/utils/classNames'
import { NotificationContext, NotificationType } from '@/modules/contexts/NotificationContext'
import Input from 'components/Input'
import { GetServerSidePropsContext } from 'next'
import { signIn } from 'next-auth/react'
import router from 'next/router'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'

const SignUp = () => {
  const { triggerNotification } = useContext(NotificationContext)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  const validateEmail = (email: string) => emailPattern.test(email)
  const validateUsername = (username: string) => usernamePattern.test(username)
  const validatePassword = (password: string) => passwordPattern.test(password)
  const validateConfirmPassword = (password: string, confirmPassword: string) =>
    password && confirmPassword ? password === confirmPassword : false

  const isDisabled =
    !validateEmail(email) ||
    !validateUsername(username) ||
    !validatePassword(password) ||
    !validateConfirmPassword(password, confirmPassword)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await JWT.signup({ username, email, password })

      if (res.data.isVerificationRequired) {
        await JWT.sendCode(email)
        router.push(`verify?email=${email}`)
      }
    } catch (error: any) {
      triggerNotification('', error.response.data.message, NotificationType.Error, 5000)
      console.log(error)
    }
  }

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
    setErrors((prev) => ({
      ...prev,
      username:
        event.target.value.length === 0 || validateUsername(event.target.value)
          ? ''
          : 'Invalid username (3-20 characters, you are allowed to use only letters, numbers, and _ symbol).'
    }))
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    setErrors((prev) => ({
      ...prev,
      email:
        event.target.value.length === 0 || validateEmail(event.target.value)
          ? ''
          : 'Invalid email address.'
    }))
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)

    setErrors((prev) => ({
      ...prev,
      password:
        event.target.value.length === 0 || validatePassword(event.target.value)
          ? ''
          : 'Password must be at least 8 characters long and contain letters and numbers.'
    }))
  }

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)

    setErrors((prev) => ({
      ...prev,
      confirmPassword:
        event.target.value.length === 0 || validateConfirmPassword(password, event.target.value)
          ? ''
          : 'Passwords do not match.'
    }))
  }

  const handleSignInWithGoogle = async () => {
    try {
      signIn('google')
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const onLoginClick = () => router.push('login')
  return (
    <div className="space-y-4">
      <>
        <p className="text-4xl font-extrabold">Sign up</p>
        <div>
          <p className="text-xl font-bold">Nice yo see you!</p>
          <p>Start your journey with us</p>
        </div>
        <form className="w-80 flex-col space-y-4" onSubmit={handleSubmit}>
          <Input type="text" placeholder="Email" onChange={handleEmailChange} />
          {errors.email && <p className="text-lightRed text-sm">{errors.email}</p>}

          <Input type="text" placeholder="Username" onChange={handleUsernameChange} />
          {errors.username && <p className="text-lightRed text-sm">{errors.username}</p>}

          <Input type="password" placeholder="Password" onChange={handlePasswordChange} />
          {errors.password && <p className="text-lightRed text-sm">{errors.password}</p>}

          <Input
            type="password"
            placeholder="Confirm password"
            onChange={handleConfirmPasswordChange}
          />
          {errors.confirmPassword && (
            <p className="text-lightRed text-sm">{errors.confirmPassword}</p>
          )}

          <button
            className={classNames(
              'w-full bg-red hover:bg-lightRed px-4 py-2 rounded-md',
              isDisabled && 'opacity-30'
            )}
          >
            Sign up
          </button>
        </form>
        <div className="w-80 text-center">
          <div onClick={onLoginClick} className="text-center text-sm cursor-pointer">
            Already have an account? Log in
          </div>
          <div className="cursor-pointer" onClick={handleSignInWithGoogle}>
            Continue with Google
          </div>
        </div>
      </>
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
export default SignUp
