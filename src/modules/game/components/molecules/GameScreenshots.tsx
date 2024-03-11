import classNames from '@/lib/utils/classNames'
import { GameExtended } from '@/types/types'
import { Dispatch, SetStateAction } from 'react'
import styles from '@/styles/scrollbar.module.css'

type ComponentProps = {
  game: GameExtended
  setSelectedScreenshot: Dispatch<SetStateAction<number | null>>
}

const GameScreeenshots = ({ game, setSelectedScreenshot }: ComponentProps) => {
  const maxScreenshots = 4
  const trailerSrc = game.trailers[0]

  return (
    <div
      className={classNames(
        'w-1/3 flex flex-col space-y-4 max-h-full overflow-y-auto',
        styles['show-scrollbar']
      )}
    >
      {trailerSrc && (
        <video className="object-cover" controls>
          <source src={trailerSrc} type="video/mp4" />
        </video>
      )}
      <div className="grid grid-cols-2 gap-4">
        {game.screenshots.map((screenshot, index) =>
          index === maxScreenshots ? (
            <div key={index} className="flex justify-center items-center cursor-pointer">
              <img
                onClick={() => setSelectedScreenshot(0)} // TODO page for all screenshots
                className="object-cover rounded-2xl opacity-10"
                src={screenshot}
              />
              <div className="absolute flex flex-col items-center justify-center">
                <p className="text-2xl font-bold">...</p>
                <p>View All</p>
              </div>
            </div>
          ) : (
            index > 0 &&
            index <= maxScreenshots && (
              <img
                key={index}
                onClick={() => setSelectedScreenshot(index)}
                className={'object-cover rounded-2xl cursor-pointer'}
                src={screenshot}
              />
            )
          )
        )}
      </div>
    </div>
  )
}

export default GameScreeenshots
