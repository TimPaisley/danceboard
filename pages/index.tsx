import Head from 'next/head'
import Header from '../components/Header'
import Main from '../components/Main'
import WebPlayback from '../components/WebPlayback'
import { useSession, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Home() {
  const { data: session, status } = useSession()

  const [token, setToken] = useState('')

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
        <Header />

        {token !== '' ? (
          <WebPlayback token={token} />
        ) : (
          <div className="mt-16 text-center">
            <h1 className="text-3xl font-bold">Sign in with Spotify</h1>

            <p className="mt-8 m-auto w-1/3">
              If this is the first time you&apos;re using this app, you&apos;ll need to give
              Danceboard permission to access your account.
            </p>

            <button
              className="mt-8 py-4 px-8 bg-green-600 text-white rounded-full"
              onClick={() => signIn('spotify')}>
              Sign in
            </button>
          </div>
        )}
      </Main>
    </>
  )
}
