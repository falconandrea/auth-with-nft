const hre = require('hardhat')

async function main () {
  const Whitelist = await hre.ethers.getContractFactory('Whitelist')
  const whitelist = await Whitelist.deploy()

  await whitelist.deployed()

  console.log(
    `Whitelist deployed to ${whitelist.address}`
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
