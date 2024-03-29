import { useRouter } from 'next/router'

const AnyGameLogo = () => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push('/home')}
      className={`font-archivo flex flex-col items-center justify-center text-2xl leading-6 cursor-pointer text-red-600`}
    >
      <p>Any</p>
      <p>Game</p>
    </div>
  )
}

export default AnyGameLogo
