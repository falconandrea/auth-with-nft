const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Whitelist', () => {
  let whitelist
  const newAddress = '0x0000000000000000000000000000000000000001'

  before(async () => {
    const Whitelist = await ethers.getContractFactory('Whitelist')
    whitelist = await Whitelist.deploy()
  })

  it('Should deploy', async function () {
    expect(whitelist.address).to.be.a('string')
  })

  it('Only owner can add an address', async function () {
    const [owner, user1] = await ethers.getSigners()
    await expect(whitelist.connect(user1).addUser(newAddress)).to.be.revertedWith('You are not the owner')
    await expect(whitelist.connect(owner).addUser(user1.address)).to.be.not.reverted
  })

  it('Should add a new address', async function () {
    await whitelist.addUser(newAddress)
    expect(await whitelist.isInWhitelist(newAddress)).to.be.true
  })

  it('Should revert if try to add user just in whitelist', async function () {
    await expect(whitelist.addUser(newAddress)).to.be.revertedWith('Address already in whitelist')
  })

  it('Should remove an address', async function () {
    await whitelist.removeUser(newAddress)
    expect(await whitelist.isInWhitelist(newAddress)).to.be.false
  })

  it('Should revert if try to remove user not in whitelist', async function () {
    await expect(whitelist.removeUser(newAddress)).to.be.revertedWith('Address not in whitelist')
  })
})
/*
describe('Events', function () {
  it('Should emit an event on withdrawals', async function () {
    const { lock, unlockTime, lockedAmount } = await loadFixture(
      deployFixture
    )

    await time.increaseTo(unlockTime)

    await expect(lock.withdraw())
      .to.emit(lock, 'Withdrawal')
      .withArgs(lockedAmount, anyValue) // We accept any value as `when` arg
  })
})
*/
