import { useState, useEffect } from 'react'
import { PlayButton, PauseButton, NextButton, PreviousButton } from './Icons'
import Features from './Features'

export default function WebPlayback({ token }) {
  const [active, setActive] = useState(false)
  const [player, setPlayer] = useState(undefined)
  const [playerState, setPlayerState] = useState(undefined)
  const [estimatedPosition, setEstimatedPosition] = useState(0)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Danceboard',
        getOAuthToken: (cb) => {
          cb(token)
        },
        volume: 0.5,
      })

      setPlayer(player)

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
      })

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return
        }

        console.log('new state', state)

        setPlayerState(state)
        setEstimatedPosition(state.position)

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true)
        })
      })

      player.connect()
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (playerState && !playerState.paused) {
        setEstimatedPosition((state) => state + 1000)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [playerState])

  if (!active) {
    return (
      <div className="mt-16 text-center">
        <h1 className="text-3xl font-bold">Danceboard is ready!</h1>

        <p className="mt-8">
          Open the Spotify app and transfer playback to Danceboard to get started.
        </p>
      </div>
    )
  } else {
    const previousTracks = playerState.track_window.previous_tracks
    const currentTrack = playerState.track_window.current_track
    const nextTracks = playerState.track_window.next_tracks

    return (
      <div className="mt-16">
        <h2 className="text-xl text-center">Now playing</h2>
        <h1 className="text-3xl font-bold text-center">
          {playerState.context.metadata.context_description}
        </h1>

        <div className="mt-16 w-full flex justify-center">
          <SecondaryTrack track={previousTracks.length > 1 ? previousTracks[0] : undefined} />
          <SecondaryTrack track={previousTracks[1] || previousTracks[0]} />

          <PrimaryTrack track={currentTrack} />

          <SecondaryTrack track={nextTracks[0]} />
          <SecondaryTrack track={nextTracks[1]} />
        </div>

        <div className="text-center">
          <h1 className="mt-4 text-4xl font-bold">{currentTrack.name}</h1>
          <h2 className="text-2xl">{currentTrack.artists.map((a) => a.name).join(', ')}</h2>
        </div>

        <Features
          songId={currentTrack.id}
          position={estimatedPosition}
          duration={playerState.duration}
        />

        <div className="mt-16 flex justify-center">
          <button onClick={() => player.previousTrack()}>
            <PreviousButton />
          </button>
          <button onClick={() => player.togglePlay()}>
            {playerState.paused ? <PlayButton /> : <PauseButton />}
          </button>
          <button onClick={async () => player.nextTrack()}>
            <NextButton />
          </button>
        </div>

        <ProgressBar progress={(estimatedPosition / playerState.duration) * 100} />
      </div>
    )
  }
}

function PrimaryTrack({ track }) {
  return (
    <div className="w-96 mx-8 text-center">
      <img src={track.album.images[0].url} className="w-full rounded-2xl" alt="" />
    </div>
  )
}

function SecondaryTrack({ track }) {
  return (
    <div className="w-48 mx-8 text-center">
      <img src={track?.album.images[0].url || ''} className="w-full rounded-2xl" alt="" />

      <div>
        <h1 className="mt-4 text-xl font-bold">{track?.name}</h1>
        <h2 className="text-md">{track?.artists.map((a) => a.name).join(', ')}</h2>
      </div>
    </div>
  )
}

function ProgressBar({ progress }) {
  return (
    <div className="mx-8 mt-8 relative h-1 bg-black">
      <div
        className="absolute w-6 h-6 rounded-full -top-2.5 bg-black"
        style={{ left: `${progress}%` }}
      />
    </div>
  )
}
