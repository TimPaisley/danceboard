import { useSession, signIn, signOut } from 'next-auth/react'

export default function Header() {
  return (
    <div className="w-full flex justify-between align-middle">
      <h1 className="text-2xl font-bold">Danceboard</h1>
      <SessionManagement />
    </div>
  )
}

function SessionManagement() {
  const { data: session } = useSession()

  if (session?.token) {
    return (
      <div>
        {session.token?.email} | <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  } else {
    return <button onClick={() => signIn('spotify')}>Sign in</button>
  }
}
