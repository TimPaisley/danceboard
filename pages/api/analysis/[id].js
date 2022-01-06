import { getSongAnalysis } from '../../../lib/spotify'
import { getSession } from 'next-auth/react'

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req })
  const response = await getSongAnalysis(accessToken, req.query.id)
  const analysis = await response.json()

  return res.status(200).json({ analysis })
}

export default handler
