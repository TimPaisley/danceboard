import useSWR from 'swr'
import { PlayButton, PauseButton, NextButton, PreviousButton } from './Icons'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Features({ songId, player, isPaused }) {
  const { data, error } = useSWR(() => songId && `/api/features/${songId}`, fetcher)

  const getKey = (pitchClass) => {
    if (pitchClass == 0) {
      return 'C'
    } else if (pitchClass == 1) {
      return 'C♯'
    } else if (pitchClass == 2) {
      return 'D'
    } else if (pitchClass == 3) {
      return 'E♭'
    } else if (pitchClass == 4) {
      return 'E'
    } else if (pitchClass == 5) {
      return 'F'
    } else if (pitchClass == 6) {
      return 'F♯'
    } else if (pitchClass == 7) {
      return 'G'
    } else if (pitchClass == 8) {
      return 'A♭'
    } else if (pitchClass == 9) {
      return 'A'
    } else if (pitchClass == 10) {
      return 'B♭'
    } else if (pitchClass == 11) {
      return 'B'
    } else {
      return 'Unknown'
    }
  }

  const getSpeedClass = (bpm) => {
    if (bpm < 80) {
      return 'VERY SLOW'
    } else if (bpm >= 80 && bpm < 100) {
      return 'SLOW'
    } else if (bpm >= 100 && bpm < 120) {
      return 'MODERATE'
    } else if (bpm >= 120 && bpm < 140) {
      return 'FAST'
    } else if (bpm > 140) {
      return 'VERY FAST'
    }
  }

  if (error) return <div>Failed to analyse song</div>
  // if (!data) return <div>Loading analysis...</div>

  return (
    <div className="rounded-lg px-8 bg-gray-50 text-gray-500 flex items-center border border-gray-100">
      <div className="flex-1 flex justify-between">
        {data ? (
          <Feature
            label={getSpeedClass(Math.round(data.tempo))}
            value={Math.round(data.tempo) + ' BPM'}
          />
        ) : (
          <Feature label="BPM" value="Loading" />
        )}

        {data ? (
          <Feature
            label={data.time_signature + '/4 time'}
            value={getKey(data.key) + ' ' + (data.mode ? 'major' : 'minor')}
          />
        ) : (
          <Feature label="KEY" value="Loading" />
        )}
      </div>

      <div className="flex-1 flex justify-center items-center text-gray-900">
        <Controls player={player} isPaused={isPaused} />
      </div>

      <div className="flex-1 flex justify-between">
        {data ? (
          <Feature label="DANCEABILITY" value={Math.round(data.danceability * 100)} />
        ) : (
          <Feature label="DANCEABILITY" value="Loading" />
        )}

        {data ? (
          <Feature label="ENERGY" value={Math.round(data.energy * 100)} />
        ) : (
          <Feature label="ENERGY" value="Loading" />
        )}
      </div>
    </div>
  )
}

function Feature({ label, value }) {
  return (
    <div className="flex-1 flex flex-col justify-center text-center">
      <h4 className="text-xl font-bold">{value}</h4>
      <h5 className="text-sm">{label}</h5>
    </div>
  )
}

function Controls({ player, isPaused }) {
  return (
    <>
      <button
        type="button"
        onClick={() => player.previousTrack()}
        className="w-8 h-8"
        aria-label="Previous song">
        <PreviousButton />
      </button>

      <button
        type="button"
        onClick={() => player.togglePlay()}
        class="bg-white -my-2 mx-8 w-20 h-20 rounded-full ring-1 ring-gray-900/5 shadow-md flex items-center justify-center"
        aria-label="Pause song">
        {isPaused ? <PlayButton /> : <PauseButton />}
      </button>

      <button
        type="button"
        onClick={() => player.nextTrack()}
        className="w-8 h-8"
        aria-label="Next song">
        <NextButton />
      </button>
    </>
  )
}
