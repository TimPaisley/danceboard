export default function Tracks({ playerState }) {
  const previousTracks = playerState.track_window.previous_tracks
  const currentTrack = playerState.track_window.current_track
  const nextTracks = playerState.track_window.next_tracks

  return (
    <>
      <h2 className="text-3xl text-center mb-4">Now playing</h2>
      <h1 className="text-5xl font-bold text-center">
        {playerState.context.metadata.context_description}
      </h1>

      <div className="mt-16 w-full flex justify-center">
        <SecondaryTrack track={previousTracks.length > 1 ? previousTracks[0] : undefined} />
        <SecondaryTrack track={previousTracks[1] || previousTracks[0]} />

        <PrimaryTrack track={currentTrack} />

        <SecondaryTrack track={nextTracks[0]} />
        <SecondaryTrack track={nextTracks[1]} />
      </div>

      <div className="mt-16 text-center">
        <h1 className="text-5xl font-bold text-cyan-500">{currentTrack.name}</h1>
        <h2 className="text-3xl mt-4">{currentTrack.artists.map((a) => a.name).join(', ')}</h2>
      </div>
    </>
  )
}

function PrimaryTrack({ track }) {
  return (
    <div className="w-96 mx-8 text-center">
      <img
        src={track.album.images[0].url}
        className="w-full rounded-2xl ring-1 ring-gray-900/5 shadow-md"
        alt=""
      />
    </div>
  )
}

function SecondaryTrack({ track }) {
  return (
    <div className="w-60 mx-8 text-center">
      <img
        src={track?.album.images[0].url || ''}
        className="w-full rounded-2xl ring-1 ring-gray-900/5 shadow-md"
        alt=""
      />

      <div>
        <h1 className="mt-4 text-xl font-bold">{track?.name}</h1>
        <h2 className="text-md">{track?.artists.map((a) => a.name).join(', ')}</h2>
      </div>
    </div>
  )
}
