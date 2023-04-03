
// Get truncated address
const truncateAddress = (address) => {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

// Check if address have the NFT
const checkNFT = async () => {
  console.log('checkNFT', false)
  return { status: 'success', data: false }
}

// Check if address is in whitelist
const checkWL = async (factory, account) => {
  try {
    const result = await factory.isInWhitelist(account)
    console.log('checkWL', result)
    return { status: 'success', data: result }
  } catch (error) {
    console.log('checkWL', error)
    return { status: 'error', data: error.error.message }
  }
}

// Check if address have request to access to whitelist
const checkRequestWL = async (address) => {
  let res = await fetch('api/whitelist/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ address })
  })
  res = await res.json()
  console.log('checkRequestWL', res.result)
  return { status: 'success', data: res.result }
}

// Request access to whitelist
const requestWL = async (address) => {
  let res = await fetch('api/whitelist/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ address })
  })
  res = await res.json()
  return { status: 'success', data: res.result }
}

module.exports = {
  truncateAddress,
  checkNFT,
  checkWL,
  checkRequestWL,
  requestWL
}
