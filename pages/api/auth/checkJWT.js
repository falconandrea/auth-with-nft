const jwt = require('jsonwebtoken')

export default async function handler (req, res) {
  const { jwtData } = req.body
  const decoded = jwt.verify(jwtData, process.env.JWT_SECRET)

  if (decoded.exp < Date.now() / 1000) {
    return res.status(200).json({ valid: false })
  }
  return res.status(200).json({ valid: true })
}
