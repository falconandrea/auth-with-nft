// Get truncated address
const truncateAddress = (address) => {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

// Check if address have the NFT
const checkNFT = async (factory, account) => {
  try {
    const result = await factory.balanceOf(account)
    console.log('checkNFT', parseInt(result))
    return { status: 'success', data: parseInt(result) > 0 }
  } catch (error) {
    console.log('checkNFT', error)
    return { status: 'error', data: error.error.message }
  }
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
  if (!res.ok) {
    res = await res.json()
    return { status: 'error', data: res.message }
  }
  res = await res.json()
  console.log('checkRequestWL', res.result)
  return { status: 'success', data: res.result }
}

// Request access to whitelist
const requestWL = async (address) => {
  try {
    let res = await fetch('api/whitelist/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address })
    })
    if (!res.ok) {
      res = await res.json()
      return { status: 'error', data: res.message }
    }
    res = await res.json()
    return { status: 'success', data: res.result }
  } catch (error) {
    return { status: 'error', data: error }
  }
}

// This function returns signature and the original message
const generateSignMessage = async (signer, address) => {
  const timestamp = Math.floor(Date.now() / 1000)
  const message = `This request will not trigger a blockchain transaction or cost any gas fees.
    Your authentication status will reset after 24 hours.
    Address:${address}
    Timestamp:${timestamp}
    `
  const signature = await signer.signMessage(message)
  return { signature, message }
}

// Login with JWT
const loginJWT = async (signature, message) => {
  try {
    let res = await fetch('api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ signature, message })
    })
    if (!res.ok) {
      res = await res.json()
      return { status: 'error', data: res.message }
    }
    res = await res.json()
    return { status: 'success', data: res.jwt }
  } catch (error) {
    return { status: 'error', data: error }
  }
}

// Check JWT
const checkJWT = async (jwtData) => {
  try {
    let res = await fetch('api/auth/checkJWT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ jwtData })
    })
    if (!res.ok) {
      return false
    }
    res = await res.json()
    return res.valid
  } catch (error) {
    return false
  }
}

module.exports = {
  truncateAddress,
  checkNFT,
  checkWL,
  checkRequestWL,
  requestWL,
  generateSignMessage,
  loginJWT,
  checkJWT
}
