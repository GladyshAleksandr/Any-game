import getGames from '@/lib/backend/utils/getGames'
import getGamesByCriteria from '@/lib/backend/utils/getGamesByCriteria'
import serializeData from '@/lib/backend/utils/serializeData'
import HomeAPI, { GameCriteria } from '@/lib/ui/api-client/home'
import GameCards from '@/modules/home/components/molecules/GameCards'
import SearchGames from '@/modules/home/components/molecules/SearchGames'
import { GameExtended } from '@/types/types'
import OptionButton from 'components/ui/OptionButton'
import Spinner from 'components/ui/Spinner'
import debounce from 'lodash.debounce'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

type ComponentProps = {
  initialGames: GameExtended[]
}

const Home = ({ initialGames }: ComponentProps) => {
  const router = useRouter()

  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [gamesEnded, setGamesEnded] = useState(false)
  const [criteria, setCriteria] = useState(router.query.type)
  const [games, setGames] = useState(initialGames)

  useEffect(() => {
    if (router.query.type !== criteria) {
      setGames(initialGames)
      setCriteria(router.query.type)
    }
  }, [criteria])

  useEffect(() => {
    const fetchGames = async () => {
      try {
        console.log('CLIENT page', page)
        console.log('CLIENT criteria', criteria)
        console.log('CLIENT page', router.query.slug)

        const res = await HomeAPI.games(page, criteria, router.query.slug)
        if (router.query.type === criteria && res.data.games.length < 20) setGamesEnded(true)
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
      {!gamesEnded && (
        <OptionButton className="mx-auto"> {isLoading ? <Spinner /> : 'Load More'}</OptionButton>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log(' context.query.type', context.query.type)
  const games = await getGamesByCriteria(
    1,
    context.query.type as unknown as GameCriteria,
    context.query.slug as unknown as string
  )

  const serializedGames = serializeData(games)
  return {
    props: {
      initialGames: serializedGames
    }
  }
}

export default Home
