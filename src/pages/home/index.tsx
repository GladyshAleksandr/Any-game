import getGames from '@/lib/backend/utils/getGames'
import serializeData from '@/lib/backend/utils/serializeData'
import HomeAPI from '@/lib/ui/api-client/home'
import GameCards from '@/modules/home/components/molecules/GameCards'
import SearchGames from '@/modules/home/components/molecules/SearchGames'
import { GameExtended } from '@/types/types'
import OptionButton from 'components/ui/OptionButton'
import Spinner from 'components/ui/Spinner'
import debounce from 'lodash.debounce'
import { useState, useEffect } from 'react'

type ComponentProps = {
  initialGames: GameExtended[]
}

const Home = ({ initialGames }: ComponentProps) => {
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [games, setGames] = useState(initialGames)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await HomeAPI.games(page)
        setGames((prevGames) => [...prevGames, ...res.data.games])
      } catch (error) {
        console.error('Error fetching games:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (page === 1) return
    fetchGames()
  }, [page])

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !isLoading) {
        setIsLoading(true)
        setPage((prevState) => prevState + 1)
      }
    }, 100)
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="space-y-10">
      <SearchGames />
      <GameCards games={games} />
      <OptionButton className="mx-auto"> {isLoading ? <Spinner /> : 'Load More'}</OptionButton>
    </div>
  )
}

export async function getServerSideProps() {
  const games = await getGames()

  const serializedGames = serializeData(games)
  return {
    props: {
      initialGames: serializedGames
    }
  }
}

export default Home
