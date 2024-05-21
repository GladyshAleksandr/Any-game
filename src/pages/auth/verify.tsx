import JWT from '@/lib/ui/api-client/auth'
import classNames from '@/lib/utils/classNames'
import router from 'next/router'
import { useContext, useState, ChangeEvent, FormEvent } from 'react'
import Input from 'components/Input'
import { NotificationContext, NotificationType } from '@/modules/contexts/NotificationContext'
import isAuth from '@/lib/backend/utils/isAuth'
import { GetServerSidePropsContext } from 'next'

type ComponentProps = {
  email: string
}

const Verify = ({ email }: ComponentProps) => {
  const { triggerNotification } = useContext(NotificationContext)

  const [code, setCode] = useState('')

  const onCodeChange = (event: ChangeEvent<HTMLInputElement>) => setCode(event.target.value)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await JWT.verify(email, code)

      if (res.data.isVerified) router.push('/home')
    } catch (error: any) {
      console.log(error)
      triggerNotification('', error.response.data.message, NotificationType.Error, 5000)
    }
  }

  const handleResend = async () => {
    try {
      const res = await JWT.sendCode(email)
      triggerNotification('', res.data.message, NotificationType.Success, 5000)
    } catch (error: any) {
      console.log(error)
      triggerNotification('', error.response.data.message, NotificationType.Error, 5000)
    }
  }

  return (
    <div className="w-80 flex-col space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <p>We sent verification code to {email}</p>
        <p>Please enter received code here</p>
        <Input type="text" placeholder="Confirmation Code" onChange={onCodeChange} />
        <button className={classNames('w-full bg-red hover:bg-lightRed px-4 py-2 rounded-md')}>
          Confirm
        </button>
      </form>
      <button
        onClick={handleResend}
        className={classNames('w-full bg-red hover:bg-lightRed px-4 py-2 rounded-md')}
      >
        Resend Code
      </button>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { email } = context.query

  const isUserSingedIn = await isAuth(context)

  if (isUserSingedIn) return { redirect: { permanent: false, destination: '/home' } }

  return {
    props: { email }
  }
}

export default Verify
