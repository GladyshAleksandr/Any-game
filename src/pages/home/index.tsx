import Search from '@icons/Search.svg'

type ComponentProps = {
  data: null
}
const Home = ({ data }: ComponentProps) => {
  const checkTypeScript: boolean = true
  return (
    <div className="">
      <div>test</div>
      <div className="flex flex-row justify-between bg-white max-w-full px-4">
        <div className="flex flex-row items-center space-x-1">
          <Search />
          <input type="text" className="outline-none text-[#252525]" placeholder="Search"></input>
        </div>
        <button className="bg-red-500 p-3">Button</button>
      </div>
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
