import '../styles/globals.css'
import Layout from '@/lib/ui/layout/Layout'
import AppProps from 'next/app'


const MyApp = ({ Component, pageProps }: AppProps) => {
    return <div className="text-[#ededed] m-10">
        <Layout>
            <Component {...pageProps} />
            </Layout>
            </div>
}

export default MyApp
  