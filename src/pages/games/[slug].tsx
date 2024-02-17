import prisma from '@/lib/prisma'
import { GameExtended } from '@/types/types'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Carousel from 'nuka-carousel'
import { useState } from 'react'

type GameType = {
  game: GameExtended
}
const Game = ({ game }: GameType) => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<number | null>(null)
  const maxScreenshots = 4

  // TODO improove carousel UI

  return (
    <div>
      <div className="flex space-x-6">
        <Image
          onClick={() => setSelectedScreenshot(0)}
          className={'object-cover rounded-2xl cursor-pointer'}
          src={game.backgroundImage}
          alt=""
          width={384}
          height={384}
          priority
        />
        <div className="">
          <div>
            <p className="text-xl font-extrabold">{game.name}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 self-center">
          {game.screenshots.map((screenshot, index) =>
            index === maxScreenshots ? (
              <div key={index} className="flex justify-center items-center cursor-pointer">
                <Image
                  onClick={() => null} // TODO show all screenshots
                  className="object-cover rounded-2xl opacity-10"
                  src={screenshot}
                  alt=""
                  width={300}
                  height={160}
                  priority
                />
                <div className="absolute flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold">...</p>
                  <p>View All</p>
                </div>
              </div>
            ) : (
              index > 0 &&
              index <= maxScreenshots && (
                <Image
                  key={index}
                  onClick={() => setSelectedScreenshot(index)}
                  className={'object-cover rounded-2xl cursor-pointer'}
                  src={screenshot}
                  alt=""
                  width={300}
                  height={160}
                  priority
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

      {selectedScreenshot !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100">
          <div className="max-w-screen-xl w-3/4">
            <Image
              onClick={() => setSelectedScreenshot(null)}
              className="absolute right-10 top-10 bg-gray-600 rounded-3xl cursor-pointer"
              alt={''}
              src={'/icons/Cross.svg'}
              height={42}
              width={42}
            />
            <Carousel slideIndex={selectedScreenshot}>
              {game.screenshots.map((screenshot, index) => (
                <img key={index} className="object-cover" src={screenshot} alt="" />
              ))}
            </Carousel>
          </div>
        </div>
      )}
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
