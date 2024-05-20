import { PAGE_SIZE } from '@/constants'
import getGamesByCriteria from '@/lib/backend/utils/getGamesByCriteria'
import serializeData from '@/lib/backend/utils/serializeData'
import HomeAPI, { GameCriteria } from '@/lib/ui/api-client/home'
import GameCards from '@/modules/home/components/molecules/GameCards'
import SearchGames from '@/modules/home/components/molecules/SearchGames'
import { GameExtended } from '@/types/types'
import { AxiosResponse } from 'axios'
import OptionButton from 'components/OptionButton'
import Spinner from 'components/Spinner'
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
  const [gamesEnded, setGamesEnded] = useState(initialGames.length < PAGE_SIZE)
  const [games, setGames] = useState(initialGames)

  useEffect(() => {
    setGames(initialGames)
  }, [router.query])

  useEffect(() => {
    const fetchGames = async () => {
      try {
        let res: AxiosResponse

        if (router.query.type)
          res = await HomeAPI.games(
            page,
            router.query.type as GameCriteria,
            String(router.query.slug || router.query.name)
          )
        else res = await HomeAPI.games(page)

        res.data.games.length < PAGE_SIZE ? setGamesEnded(true) : setGamesEnded(false)

        setGames((prevGames) => [...prevGames, ...res.data.games])
      } catch (error) {
        console.error('Error fetching games:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (page === 1 || gamesEnded) return
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
  const games = await getGamesByCriteria(
    1,
    context.query.type as unknown as GameCriteria,
    (context.query.slug || context.query.name) as unknown as string
  )

  const serializedGames = serializeData(games)
  return {
    props: {
      initialGames: serializedGames
    }
  }
}

export default Home
