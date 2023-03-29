require('dotenv').config()
const { google } = require('googleapis')

const target = ['https://www.googleapis.com/auth/spreadsheets']
const jwt = new google.auth.JWT(
  process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  null,
  (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  target
)
const sheets = google.sheets({ version: 'v4', auth: jwt })

const checkWhitelist = async (address) => {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_DRIVE_SPREADSHEET,
    range: 'Foglio1!A:A', // Change Foglio1 to Sheet1 if you have English language
    majorDimension: 'COLUMNS'
  })
  const rows = response.data.values && response.data.values.length > 0 ? response.data.values[0] : []

  if (rows.includes(address)) return true
  else return false
}

const writeAddress = async (address) => {
  const result = await checkWhitelist(address)

  if (!result) {
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_DRIVE_SPREADSHEET,
        range: 'Foglio1!A2:A', // Change Foglio1 to Sheet1 if you have English language
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [
            [address]
          ]
        }
      })
      return true
    } catch (err) {
      console.log(err)
    }
  } else {
    return false
  }
}

module.exports = { writeAddress, checkWhitelist }
