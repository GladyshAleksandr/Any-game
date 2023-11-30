import '../styles/globals.css'
import AppProps from 'next/app'


const MyApp = ({ Component, pageProps }: AppProps) => {
    return <div className="text-[#ededed]"><Component {...pageProps} /></div>
}

export default MyApp
  