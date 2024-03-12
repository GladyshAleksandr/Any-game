import '../styles/globals.css'
import Layout from '@/lib/ui/layout/Layout'
import { SessionProvider } from 'next-auth/react'
import AppProps from 'next/app'
import Head from 'next/head'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="text-[#ededed] xxs:m-2  xs:m-10">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </div>
  )
}

export default MyApp
