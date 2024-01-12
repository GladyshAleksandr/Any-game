import Search from '@icons/Search.svg'

type ComponentProps = {
  data: null
}
const Home = ({ data }: ComponentProps) => {
  //TODO const games

  return (
    <div className="flex justify-center">
      <div className="flex flex-row justify-between w-1/2 rounded-md bg-white max-w-full px-4 py-3">
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
      <div></div>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      data: null
    }
  }
}

export default Home
