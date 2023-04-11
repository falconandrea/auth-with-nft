import Login from '@/artifacts/contracts/Login.sol/Login.json'
import { ethers } from 'hardhat'

export default async function handler (req, res) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send('eth_requestAccounts', [])
  const signer = await provider.getSigner()
  console.log(signer)
}
