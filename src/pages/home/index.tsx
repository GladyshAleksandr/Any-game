type ComponentProps = {
  data: null
}
const Home = ({data}: ComponentProps) => {
  const checkTypeScript: boolean = true
  return <div className="w-full h-full bg text">Test</div>
}

export async function getServerSideProps() {

  return {
    props: {
      data: null
    },
  };
}

export default Home