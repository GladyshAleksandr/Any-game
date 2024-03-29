import { RefObject, useEffect } from 'react'

const UseClickOutside = (ref: RefObject<HTMLDivElement>, isOpen: boolean, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])
}

export default UseClickOutside
