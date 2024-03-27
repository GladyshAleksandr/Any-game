import { userFromSessionOrJWT } from '@/lib/backend/repositories/user.repository'
import prisma from '@/lib/prisma'
import UserShell from '@/lib/ui/shells/UserShell'
import { User } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'

type ComponentProps = {
  user: User
}

const GameList = ({ user }: ComponentProps) => {
  return (
    <UserShell user={user}>
      <div></div>
    </UserShell>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await userFromSessionOrJWT(context)

  if (!user) return { redirect: { permanent: false, destination: '/auth/login' } }

  const mUser = await prisma.user.findUnique({ where: { id: user.id } })

  return {
    props: {
      user: mUser
    }
  }
}

export default GameList
