import { signIn } from 'next-auth/react'

export default function Welcome({ ready = false }) {
  return (
    <div className="flex-grow max-w-3xl w-full m-auto my-8">
      <h1 className="text-3xl">Welcome to Danceboard</h1>

      <p className="mt-8">
        Danceboard is an open-source webapp designed to display dance playlists on a projector or
        big screen during a dance party.
      </p>

      <div className={ready ? 'opacity-30' : ''}>
        <p className="mt-12 text-sm font-bold flex space-x-2">
          {ready && <CheckIcon />}
          <span>Step 1</span>
        </p>
        <h2 className="text-2xl">Sign in with Spotify</h2>

        <p className="mt-8">
          In order to use this app, you&apos;ll need to give Danceboard permission to access your
          account. This webapp uses the{' '}
          <a
            className="text-green-600 hover:underline"
            href="https://developer.spotify.com/documentation/web-api/">
            Spotify Web API
          </a>
          .
        </p>
      </div>

      <p className="mt-12 text-sm font-bold">Step 2</p>
      <h2 className="text-2xl">Using your Spotify app, connect to Danceboard</h2>

      <p className="mt-8">
        Open Spotify on your computer or mobile device and use{' '}
        <a
          className="text-green-600 hover:underline"
          href="https://support.spotify.com/us/article/spotify-connect/">
          Spotify Connect
        </a>{' '}
        to connect to Danceboard. You can do this by selecting the{' '}
        <img className="inline h-6" src="spotify-connect-icon.png" /> icon.
      </p>

      <p className="mt-12 text-sm font-bold">Step 3</p>
      <h2 className="text-2xl">Using your Spotify app, start playing from your playlist</h2>

      <p className="mt-8">
        Once you're connected to Danceboard, you can use any device logged into your Spotify account
        to control your music. Start playing music from your playlist as you normally would.
      </p>

      <p className="mt-12 text-sm font-bold">Step 4</p>
      <h2 className="text-2xl">Dance!</h2>

      {!ready && (
        <button
          className="mt-12 py-4 px-8 bg-green-600 text-white rounded-full"
          onClick={() => signIn('spotify')}>
          Sign in with Spotify to get started
        </button>
      )}
    </div>
  )
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}
