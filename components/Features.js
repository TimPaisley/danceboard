import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Features({ songId, position, duration }) {
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

  const formatMillis = (millis) => {
    const seconds = Math.round(millis / 1000)
    const remainingSeconds = seconds % 60
    const minutes = (seconds - remainingSeconds) / 60

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  if (error) return <div>Failed to analyse song</div>
  // if (!data) return <div>Loading analysis...</div>

  return (
    <div className="my-16 flex justify-around text-center px-8">
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

      <Feature label={formatMillis(duration)} value={formatMillis(position)} />
    </div>
  )
}

function Feature({ label, value }) {
  return (
    <div>
      <h4 className="text-xl font-bold">{value}</h4>
      <h5 className="text-sm">{label}</h5>
    </div>
  )
}
