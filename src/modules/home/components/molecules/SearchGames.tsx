import Search from '@icons/Search.svg'

const SearchGames = () => {
  return (
    <div className="flex flex-row justify-between mx-auto md:w-1/2 rounded-md bg-white max-w-full px-4 py-3">
      <div className="flex flex-row items-center space-x-1">
        <Search />
        <input
          type="text"
          className="outline-none text-black placeholder-black"
          placeholder="Search"
        ></input>
      </div>
      <button className="bg-red-500 px-4 py-2 rounded-md">Filter</button>
    </div>
  )
}

export default SearchGames
