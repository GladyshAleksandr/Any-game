import prisma from '@/lib/prisma'
import { GameExtended } from '@/types/types'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'

type GameType = {
  game: GameExtended
}
const Game = ({ game }: GameType) => {
  const maxScreenshots = 4
  console.log('game', game)
  return (
    <div>
      <div className="flex space-x-6">
        <Image
          className={'object-cover rounded-2xl cursor-pointer'}
          src={game.backgroundImage}
          alt=""
          width={384}
          height={384}
        />
        <div className="">
          <div>
            <p className="text-xl font-extrabold">{game.name}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 self-center">
          {game.screenshots.map((screenshot, index) =>
            index === maxScreenshots ? (
              <div className="flex justify-center items-center cursor-pointer">
                <Image
                  className="object-cover rounded-2xl opacity-10"
                  src={screenshot}
                  alt=""
                  width={300}
                  height={160}
                />
                <div className="absolute flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold">...</p>
                  <p onClick={() => null}>View All</p>
                </div>
              </div>
            ) : (
              index > 0 &&
              index <= maxScreenshots && (
                <Image
                  className={'object-cover rounded-2xl cursor-pointer'}
                  src={screenshot}
                  alt=""
                  width={300}
                  height={160}
                />
              )
            )
          )}
        </div>
      </div>
      <div className="">
        <div>Rate</div>
        <div>Add to Collection</div>
        <div>Playing</div>
        <div>Played</div>
        <div>Dropped</div>
        <div>Add to playlist</div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = Array.isArray(context.params?.slug) ? context.params?.slug[0] : context.params?.slug
  const game = await prisma.game.findUnique({
    where: {
      slug: slug
    },
    include: {
      esrbRating: true,
      parentPlatforms: true,
      genres: true,
      tags: true
    }
  })

  return {
    props: {
      game
    }
  }
}

export default Game
