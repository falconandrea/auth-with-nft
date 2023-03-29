import { checkWhitelist } from '@/google-drive-spreadsheet'

export default async function handler (req, res) {
  const requestMethod = req.method
  const body = req.body

  if (requestMethod !== 'POST') res.status(500).json({ message: 'The API accept only POST requests' })
  if (!body.address) res.status(500).json({ message: 'Missing address to check' })

  const result = await checkWhitelist(body.address)

  res.status(200).json({ result })
}
