import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Analysis({ songId }) {
  const { data, error } = useSWR(() => songId && `/api/analysis/${songId}`, fetcher)

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
    <div className="my-16 flex justify-between text-center">
      <div>
        {data ? (
          <>
            <h4 className="text-xl">{Math.round(data.analysis.track.tempo)} BPM</h4>
            <h5 className="text-sm">{getSpeedClass(Math.round(data.analysis.track.tempo))}</h5>
          </>
        ) : (
          <>
            <h4 className="text-xl">Loading</h4>
            <h5 className="text-sm">BPM</h5>
          </>
        )}
      </div>

      <div>
        {data ? (
          <>
            <h4 className="text-xl">
              {getKey(data.analysis.track.key)} {data.analysis.track.mode ? 'major' : 'minor'}
            </h4>
            <h5 className="text-sm">{data.analysis.track.time_signature}/4 time</h5>
          </>
        ) : (
          <>
            <h4 className="text-xl">Loading</h4>
            <h5 className="text-sm">KEY</h5>
          </>
        )}
      </div>
    </div>
  )
}
