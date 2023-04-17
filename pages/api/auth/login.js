const ethers = require('ethers')
const jwt = require('jsonwebtoken')

export default async function handler (req, res) {
  const { message, signature } = req.body

  // Get timestamp and address from the message
  const addressRegex = /Address:(.*)\b/
  const timestampRegex = /Timestamp:(.*)\b/
  const address = addressRegex.exec(message)[1].trim()
  const timestamp = timestampRegex.exec(message)[1].trim()

  // Check timestamp is not older than 5 minutes
  const now = Math.floor(Date.now() / 1000)
  if (now - timestamp > 300) {
    return res.status(500).json({ message: 'Old JWT, retry to login' })
  }

  // Check signature
  const hashMessage = ethers.utils.hashMessage(message)
  const pk = ethers.utils.recoverPublicKey(hashMessage, signature)
  const recoveredAddress = ethers.utils.computeAddress(pk)

  if (recoveredAddress !== address) {
    return res.status(500).json({ message: 'Wrong JWT, retry to login' })
  }

  // Create JWT
  const accessToken = jwt.sign(
    { address },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h'
    }
  )

  return res.status(200).json({
    jwt: accessToken
  })
}
