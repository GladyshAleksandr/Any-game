import getGames from '@/lib/backend/utils/getGames'
import serializeData from '@/lib/backend/utils/serializeData'
import prisma from '@/lib/prisma'
import Filter from '@/modules/filter/components/organisms/Filter'
import GameCards from '@/modules/home/components/molecules/GameCards'
import { GameExtended } from '@/types/types'
import { EsrbRating, Genre, ParentPlatform, Tag } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'

type ComponentProps = {
  games: GameExtended[]
  genres: Genre[]
  tags: Tag[]
  parentPlatforms: ParentPlatform[]
  esrbRatings: EsrbRating[]
}

const Home = ({ games, genres, tags, parentPlatforms, esrbRatings }: ComponentProps) => {
  const [page, setPage] = useState<number>(1)

  return (
    <div>
      <Filter
        genres={genres}
        tags={tags}
        parentPlatforms={parentPlatforms}
        esrbRatings={esrbRatings}
      />
      <GameCards games={games} />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const games = await getGames()

  const genres = await prisma.genre.findMany()

  const tags = await prisma.tag.findMany()

  const parentPlatforms = await prisma.parentPlatform.findMany()

  const esrbRatings = await prisma.esrbRating.findMany()

  const serializedGames = serializeData(games)
  return {
    props: {
      games: serializedGames,
      genres,
      tags,
      parentPlatforms,
      esrbRatings
    }
  }
}

export default Home
