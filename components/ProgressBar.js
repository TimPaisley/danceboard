export default function ProgressBar({ position, duration }) {
  const formatMillis = (millis) => {
    const seconds = Math.round(millis / 1000)
    const remainingSeconds = seconds % 60
    const minutes = (seconds - remainingSeconds) / 60

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  return (
    <>
      <div className="relative">
        <div class="bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            class="bg-cyan-500 dark:bg-cyan-400 w-1/2 h-2"
            role="progressbar"
            aria-label="music progress"
            aria-valuenow={position}
            aria-valuemin="0"
            aria-valuemax={duration}
            style={{ width: `${(position / duration) * 100}%` }}
          />
        </div>
        <div
          class="ring-cyan-500 dark:ring-cyan-400 ring-2 absolute top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow"
          style={{ left: `${(position / duration) * 100}%` }}>
          <div class="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-gray-900/5" />
        </div>
      </div>

      <div className="mt-2 flex justify-between">
        <div>{formatMillis(position)}</div>
        <div>{formatMillis(duration)}</div>
      </div>
    </>
  )
}
