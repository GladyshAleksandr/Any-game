import getGames from '@/lib/backend/utils/getGames'
import GameCards from '@/modules/home/components/molecules/GameCards'
import SearchGames from '@/modules/home/components/molecules/SearchGames'
import { GameExtended } from '@/types/types'
import { useState } from 'react'

type ComponentProps = {
  games: GameExtended[]
}

// enum Platforms {
//   PC = 'pc',
//   PlayStation = 'playstation',
//   XBox = 'xbox',
//   Nintendo,
//   Mac,
//   Linux,
//   Ios,
//   Android,
//   Web,
//   Sega
// }

const Home = ({ games }: ComponentProps) => {
  const [page, setPage] = useState<number>(1)

  return (
    <div>
      <SearchGames />
      <GameCards games={games} />
    </div>
  )
}

export async function getServerSideProps() {
  const games = await getGames()

  return {
    props: {
      games
    }
  }
}

export default Home
