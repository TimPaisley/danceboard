import Head from 'next/head'
import Header from '../components/Header'
import Main from '../components/Main'
import Welcome from '../components/Welcome'
import WebPlayback from '../components/WebPlayback'
import { useSession, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Home() {
  const { data: session, status } = useSession()

  const [token, setToken] = useState('')
  const [uri, setUri] = useState()

  useEffect(() => {
    async function getToken() {
      if (status === 'authenticated') {
        const res = await fetch('/api/token')
        const { token } = await res.json()

        setToken(token)
      }
    }

    getToken()
  }, [session, status])

  return (
    <>
      <Head>
        <title>Danceboard</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Main>
        <Header uri={uri} />

        {token !== '' ? <WebPlayback token={token} setUri={setUri} /> : <Welcome />}
      </Main>
    </>
  )
}
