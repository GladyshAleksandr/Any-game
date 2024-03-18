import getGames from '@/lib/backend/utils/getGames'
import serializeData from '@/lib/backend/utils/serializeData'
import Filter from '@/modules/home/components/molecules/Filter'
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
      <Filter />
      <GameCards games={games} />
    </div>
  )
}

export async function getServerSideProps() {
  const games = await getGames()
  const serializedGames = serializeData(games)
  return {
    props: {
      games: serializedGames
    }
  }
}

export default Home
