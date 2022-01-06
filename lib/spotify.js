const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const ANALYSIS_ENDPOINT = `https://api.spotify.com/v1/audio-analysis`

export const getAccessToken = async (refresh_token) => {
  return fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })
}

export const getSongAnalysis = async (refresh_token, song_id) => {
  const res = await getAccessToken(refresh_token)
  const { access_token } = await res.json()

  return fetch(`${ANALYSIS_ENDPOINT}/${song_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  })
}
