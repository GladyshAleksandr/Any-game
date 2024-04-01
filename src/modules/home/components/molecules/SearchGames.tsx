import Search from '@icons/Search.svg'
import { useRouter } from 'next/router'

const SearchGames = () => {
  const router = useRouter()
  const handleAdvancedFilter = () => router.push('/filter')
  return (
    <div className="flex xxs:flex-col sm:flex-row xxs:space-y-4 sm:space-y-0 justify-center items-center space-x-6">
      <div className="flex flex-row justify-between md:w-1/2 rounded-md bg-white max-w-full px-4 py-3">
        <div className="flex flex-row items-center space-x-1">
          <Search />
          <input
            type="text"
            className="outline-none text-black placeholder-black"
            placeholder="Search"
          ></input>
        </div>
        <button className="bg-lightRed px-4 py-2 rounded-md">Filter</button>
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
