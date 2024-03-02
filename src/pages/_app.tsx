import '../styles/globals.css'
import Layout from '@/lib/ui/layout/Layout'
import { SessionProvider } from 'next-auth/react'
import AppProps from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="text-[#ededed] m-10">
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </div>
  )
}

export default MyApp
