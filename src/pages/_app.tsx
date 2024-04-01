import '../styles/globals.css'
import Layout from '@/lib/ui/layout/Layout'
import { SessionProvider } from 'next-auth/react'
import AppProps from 'next/app'
import Head from 'next/head'
import { userFromSessionOrJWT } from '@/lib/backend/repositories/user.repository'
import prisma from '@/lib/prisma'

const MyApp = ({ Component, pageProps, data }: AppProps) => {
  return (
    <div className="text-[#ededed] xxs:mx-2  xs:mx-10 my-10">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Layout data={data}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </div>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  let data = null

  try {
    const user = await userFromSessionOrJWT(ctx)

    const genres = await prisma.genre.findMany({
      select: {
        name: true,
        slug: true
      }
    })

    const tags = await prisma.tag.findMany({
      select: {
        name: true,
        slug: true
      }
    })

    const platforms = await prisma.parentPlatform.findMany({
      select: {
        name: true,
        slug: true
      }
    })

    data = {
      user,
      genres,
      tags,
      platforms
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return { pageProps, data }
}

export default MyApp
