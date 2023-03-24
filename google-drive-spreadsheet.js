require('dotenv').config()

const { GoogleSpreadsheet } = require('google-spreadsheet')
const creds = require('./credentials.json')
const doc = new GoogleSpreadsheet(process.env.GOOGLE_DRIVE_SPREADSHEET)

const writeAddress = async (address) => {
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]

  // Check if the address is just in list
  const rows = await sheet.getRows()
  if (rows.filter(item => item.Address === address).length > 0) return false

  // Add new address
  await sheet.addRow({ Address: address })
  return true
}

module.exports = {
  writeAddress
}
