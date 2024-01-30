// import Nav from '../components/Nav'
import Meta from '../components/Meta'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    {/* <Nav /> */}
    <Meta />
    <Component {...pageProps} />
  </>
}
