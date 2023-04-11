const hre = require('hardhat')

async function main () {
  const Whitelist = await hre.ethers.getContractFactory('Whitelist')
  const whitelist = await Whitelist.deploy()

  await whitelist.deployed()

  console.log(
    `Whitelist deployed to ${whitelist.address}`
  )

  const Login = await hre.ethers.getContractFactory('Login')
  const login = await Login.deploy()

  await login.deployed()

  console.log(
   `Login deployed to ${login.address}`
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
