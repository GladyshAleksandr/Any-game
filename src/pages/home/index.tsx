type ComponentProps = {
  data: null
}
const Home = ({data}: ComponentProps) => {
  const checkTypeScript: boolean = true
  return <div className="w-12 h-12 bg-black">Test</div>
}

export async function getServerSideProps() {

  return {
    props: {
      data: null
    },
  };
}

export default Home