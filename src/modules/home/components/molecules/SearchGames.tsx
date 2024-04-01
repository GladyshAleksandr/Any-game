import { GameCriteria } from '@/lib/ui/api-client/home'
import Search from '@icons/Search.svg'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SearchGames = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const handleSearch = () => router.push(`/home?type=${GameCriteria.name}&name=${name}`)
  const handleAdvancedFilter = () => router.push('/filter')
  return (
    <div className="flex xxs:flex-col sm:flex-row xxs:space-y-4 sm:space-y-0 justify-center items-center space-x-6">
      <div className="flex flex-row justify-between items-center md:w-1/2 rounded-md bg-white max-w-full px-4 ">
        <div className="flex flex-row items-center flex-grow space-x-1">
          <Search />
          <input
            type="text"
            className="flex flex-grow py-4 outline-none text-black placeholder-black"
            placeholder="Search"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <button onClick={handleSearch} className="bg-lightRed hover:bg-red w-20 h-10 rounded-md">
          Filter
        </button>
      </div>
      <div
        className="font-bold p-2 rounded-md cursor-pointer bg-darkGold"
        onClick={handleAdvancedFilter}
      >
        Advanced Filter
      </div>
    </div>
  )
}

export default SearchGames
