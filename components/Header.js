import { useSession, signOut } from 'next-auth/react'
import ThemeChanger from './ThemeChanger'
import { useTheme } from 'next-themes'

export default function Header({ uri }) {
  const { data: session } = useSession()
  const { theme } = useTheme()

  const currentTime = new Date().toLocaleTimeString('en-NZ', {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  })

  const spotifyCode = `https://scannables.scdn.co/uri/plain/png/${
    theme === 'dark' ? '1F2937' : 'FFFFFF'
  }/${theme === 'dark' ? 'white' : 'black'}/640/${uri}`

  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col justify-center w-72">
        {session?.token && <SessionManagement session={session} />}
      </div>

      {uri && <img className="h-16 w-64" src={spotifyCode} />}

      <div className="flex justify-end w-72 text-2xl font-mono font-bold dark:text-white">
        <p className="mr-8">{session?.token && currentTime}</p>
        <ThemeChanger />
      </div>
    </div>
  )
}

function SessionManagement({ session }) {
  return (
    <div className="flex">
      <img src={session.token.picture} className="w-16 h-16 rounded-full" alt="Profile picture" />

      <div className="ml-4 flex flex-col justify-center items-start">
        <h4 className="font-bold mb-0 dark:text-white">{session.token?.name}</h4>
        <button className="text-sm dark:text-white" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    </div>
  )
}
