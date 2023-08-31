import '../styles/globals.css'
import AppProps from 'next/app'


const MyApp = ({ Component, pageProps }: AppProps) => {
    return <div className="w-full h-full bg text"><Component {...pageProps} /></div>
}

export default MyApp
  