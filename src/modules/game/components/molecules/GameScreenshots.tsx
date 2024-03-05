import { GameExtended } from '@/types/types'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

type ComponentProps = {
  game: GameExtended
  setSelectedScreenshot: Dispatch<SetStateAction<number | null>>
}

const GameScreeenshots = ({ game, setSelectedScreenshot }: ComponentProps) => {
  const maxScreenshots = 4

  return (
    <div className="grid grid-cols-2 gap-4 self-center">
      {game.screenshots.map((screenshot, index) =>
        index === maxScreenshots ? (
          <div key={index} className="flex justify-center items-center cursor-pointer">
            <Image
              onClick={() => setSelectedScreenshot(0)} // TODO page for all screenshots
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
  )
}

export default GameScreeenshots
