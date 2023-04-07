const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Login', () => {
  let whitelist
  let login

  let userInWhitelist
  let userNotInWhitelist
  let owner

  before(async () => {
    const Whitelist = await ethers.getContractFactory('Whitelist')
    whitelist = await Whitelist.deploy()

    const Login = await ethers.getContractFactory('Login')
    login = await Login.deploy()

    const [ownerAddress, user1, user2] = await ethers.getSigners()
    owner = ownerAddress
    userInWhitelist = user1
    userNotInWhitelist = user2
  })

  it('Should deploy', async function () {
    expect(whitelist.address).to.be.a('string')
    expect(login.address).to.be.a('string')
  })

  it('Set whitelist address on Login contract', async function () {
    await expect(login.connect(userInWhitelist).setWhitelistAddress(whitelist.address)).to.be.revertedWith('Only owner can change whitelist address')
    await expect(login.connect(owner).setWhitelistAddress(whitelist.address)).to.be.not.reverted
  })

  it('Add a user on whitelist', async function () {
    await whitelist.addUser(userInWhitelist.address)
    expect(await whitelist.isInWhitelist(userInWhitelist.address)).to.be.true
  })

  it('Only whitelist user can mint', async function () {
    // Block user not in whitelist
    await expect(login.connect(userNotInWhitelist).mintLogin()).to.be.revertedWith('You are not in whitelist')
    await expect(login.connect(userInWhitelist).mintLogin()).to.be.not.reverted
  })

  it('Only 1 NFT for user', async function () {
    // Only 1 NFT for user
    await expect(login.connect(userInWhitelist).mintLogin()).to.be.revertedWith('Max Mint per wallet reached')
    // Check if NFT is minted
    const count = await login.balanceOf(userInWhitelist.address)
    expect(count).to.be.equal(1)
  })
})
