import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()

  const currentTime = new Date().toLocaleTimeString('en-NZ', {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <div className="flex justify-between items-start h-24">
      <div className="flex flex-col justify-center w-72">
        {session?.token && <SessionManagement session={session} />}
      </div>

      <img
        className="h-full"
        src="https://static.wixstatic.com/media/1b63f7_8175aa2129e44292850a54ecbc044b47~mv2.png/v1/fill/w_407,h_150,al_c,q_85,usm_0.66_1.00_0.01/1b63f7_8175aa2129e44292850a54ecbc044b47~mv2.webp"
        alt="Logo"
      />

      <div className="flex flex-col justify-center w-72 text-2xl text-right font-mono font-bold">
        {session?.token && currentTime}
      </div>
    </div>
  )
}

function SessionManagement({ session }) {
  return (
    <div className="flex">
      <img src={session.token.picture} className="w-16 h-16 rounded-full" alt="Profile picture" />

      <div className="ml-4 flex flex-col justify-center items-start">
        <h4 className="font-bold mb-0">{session.token?.name}</h4>
        <button className="text-sm" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    </div>
  )
}
