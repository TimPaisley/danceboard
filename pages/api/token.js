import { getAccessToken } from '../../lib/spotify'
import { getSession } from 'next-auth/react'

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req })
  const response = await getAccessToken(accessToken)
  const { access_token } = await response.json()

  return res.status(200).json({ token: access_token })
}

export default handler
