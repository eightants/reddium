import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid URL parameter' })
  }

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    })

    const contentType = response.headers['content-type']
    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, max-age=86400') // Cache for 1 day
    res.send(response.data)
  } catch (error) {
    console.error('Error proxying image:', error)
    res.status(500).json({ error: 'Error proxying image' })
  }
}