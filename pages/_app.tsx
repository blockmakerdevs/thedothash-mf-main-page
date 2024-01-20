import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {useState, useEffect} from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {
  
  const [isSSR, setIsSSR] = useState(true) // <-

  useEffect(() => {                        // <-
    setIsSSR(false)
  }, [])
  
  if (isSSR) return null                   // <- This is just to prevent some errors in the future i.e for better performances 
  
  return (
<GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
  <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
    <Head>
        <title>The Dot Hash</title>
    </Head>
    <Navbar/> 
    <div className='flex gap-6 md:gap-20'>
      <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
        <Sidebar/>
      </div>
      <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
        <Component {...pageProps} />
      </div>
    </div>
  </div>  
</GoogleOAuthProvider>)
}
