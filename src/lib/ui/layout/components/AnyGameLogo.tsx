import { useRouter } from 'next/router'

const AnyGameLogo = () => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push('/home')}
      className="font-archivo text-2xl leading-6 cursor-pointer"
    >
      <p>Any</p>
      <p>Game</p>
    </div>
  )
}

export default AnyGameLogo
