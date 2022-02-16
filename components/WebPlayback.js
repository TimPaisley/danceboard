import { useState, useEffect } from 'react'
import Features from './Features'
import ProgressBar from './ProgressBar'
import Tracks from './Tracks'
import Welcome from './Welcome'

export default function WebPlayback({ token, setUri }) {
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

    setUri(playerState?.context.uri)

    return () => clearInterval(timer)
  }, [playerState])

  if (!active) {
    return <Welcome ready />
  } else {
    return (
      <div className="flex flex-col justify-between items-stretch h-full">
        <div className="flex-1 flex flex-col justify-center">
          <Tracks playerState={playerState} />
        </div>

        <div className="mt-16">
          <div className="mb-8">
            <ProgressBar position={estimatedPosition} duration={playerState.duration} />
          </div>

          <Features
            songId={playerState.track_window.current_track.id}
            player={player}
            isPaused={playerState.paused}
          />
        </div>
      </div>
    )
  }
}
