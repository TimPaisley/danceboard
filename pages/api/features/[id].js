import { getSongFeatures } from '../../../lib/spotify'
import { getSession } from 'next-auth/react'

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req })
  const response = await getSongFeatures(accessToken, req.query.id)
  const features = await response.json()

  return res.status(200).json({ ...features.audio_features[0] })
}

export default handler
