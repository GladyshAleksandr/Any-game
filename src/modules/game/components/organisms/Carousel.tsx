import { GameExtended } from '@/types/types'
import Image from 'next/image'
import NukaCarousel from 'nuka-carousel'

import { Dispatch, SetStateAction } from 'react'

type ComponentProps = {
  game: GameExtended
  selectedScreenshot: number | null
  setSelectedScreenshot: Dispatch<SetStateAction<number | null>>
}

const Carousel = ({ game, selectedScreenshot, setSelectedScreenshot }: ComponentProps) => {
  return (
    <>
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
            <NukaCarousel slideIndex={selectedScreenshot}>
              {game.screenshots.map((screenshot, index) => (
                <img key={index} className="object-cover" src={screenshot} alt="" />
              ))}
            </NukaCarousel>
          </div>
        </div>
      )}
    </>
  )
}

export default Carousel
