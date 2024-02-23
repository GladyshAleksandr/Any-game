import Input from 'components/Input'
import { useRef } from 'react'

const Login = () => {
  const usernameOrEmailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const onSubmit = () => {
    const email = usernameOrEmailRef?.current?.value
    const password = passwordRef?.current?.value
  }
  return (
    <div>
      <p className="text-4xl font-extrabold">Log in</p>

      <div className="my-4">
        <p className="text-xl font-bold">Welcome back!</p>
        <p>Continue your journey with us</p>
      </div>
      <form className="w-80 flex-col space-y-4" onSubmit={onSubmit}>
        <Input type="text" placeholder="Username or email" htmlRef={usernameOrEmailRef} />
        <Input type="password" placeholder="Password" htmlRef={passwordRef} />
        <button className="w-full bg-red-500 px-4 py-2 rounded-md">Log in</button>
      </form>
    </div>
  )
}

export default Login
