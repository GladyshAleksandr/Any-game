import Footer from './Footer'
import Header, { HeaderOptionsType } from './Header'

type ComponentProps = {
  children: any
  data: HeaderOptionsType
}

const Layout = ({ children, data }: ComponentProps) => {
  return (
    <div className="">
      <Header data={data} />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
