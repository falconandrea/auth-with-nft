import Head from 'next/head'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Whitelist from './../artifacts/contracts/Whitelist.sol/Whitelist.json'

export default function Home () {
  const [currentAccount, setCurrentAccount] = useState('')
  const [signer, setSigner] = useState()
  const [chainId, setChainId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Get truncated address
  const truncateAddress = (address) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
  }

  // Listeners on account change and network change
  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      console.log('Change account on metamask', accounts[0])
      setCurrentAccount(accounts[0])
    })

    window.ethereum.on('chainChanged', function (networkId) {
      console.log('Change chain on metamask', networkId)
      setChainId(networkId)
      // It's a best practice reload page after change network
      window.location.reload()
    })
  }, [])

  // Listener on account and chain
  useEffect(() => {
    setErrorMessage('')

    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) {
      return
    }
    if (!window.ethereum) {
      setErrorMessage('Please install MetaMask')
      return
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getNetwork().then((result) => {
      if (result.chainId !== parseInt(process.env.NEXT_PUBLIC_NETWORK_CHAINID)) {
        setErrorMessage(`You have to switch on ${process.env.NEXT_PUBLIC_NETWORK_CHAINNAME} Network`)
        return
      }
      setChainId(result.chainId)
    })
  }, [currentAccount, chainId])

  // Check if address is in whitelist
  const requestWL = async () => {
    const factory = new ethers.Contract(process.env.NEXT_PUBLIC_WHITELIST_ADDRESS, Whitelist.abi, signer)
    try {
      const result = await factory.isInWhitelist(currentAccount)
      if (!result) setErrorMessage('You are not in whitelist')
    } catch (error) {
      setErrorMessage(error.error.message)
    }
  }

  // Connect to wallet
  const onClickConnect = async () => {
    // Check MetaMask installed
    if (!window.ethereum) {
      setErrorMessage('Please install MetaMask')
      return
    }

    // Connect to account in MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signerAccount = await provider.getSigner()
    setSigner(signerAccount)
    setCurrentAccount(await signerAccount.getAddress())
  }

  return (
    <>
      <Head>
        <title>Login with your NFT</title>
        <meta name='description' content='Login with your NFT' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-full'>
        <section className='gradient-form h-full'>
          <div className='container mx-auto mt-8 h-full p-10'>
            <div
              className='g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200'
            >
              <div className='w-full'>
                <div
                  className='block rounded-lg bg-white shadow-lg dark:bg-neutral-800'
                >
                  <div className='g-0 lg:flex lg:flex-wrap'>
                    <div className='px-4 md:px-0 lg:w-6/12'>
                      <div className='md:mx-6 md:p-12'>
                        <div className='text-center'>
                          <h4 className='mt-1 mb-12 pb-1 text-xl font-semibold'>
                            Auth with NFT
                          </h4>
                        </div>
                        <form>
                          <div className='mb-12 pt-1 pb-1 text-center'>
                            {currentAccount
                              ? (
                                <div>
                                  <p>Welcome {truncateAddress(currentAccount)}!</p>
                                  <div className='flex items-center justify-between pb-6 mt-16'>
                                    <p className='mb-0 mr-2'>Aren't you in Whitelist?</p>
                                    <button
                                      type='button'
                                      onClick={requestWL}
                                      className='inline-block rounded border-2 border-danger px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
                                    >
                                      Request!
                                    </button>
                                  </div>
                                  <div className='flex items-center justify-between pb-6 mt-2'>
                                    <p className='mb-0 mr-2'>Don't have an NFT?</p>
                                    <button
                                      type='button'
                                      className='inline-block rounded border-2 border-danger px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
                                    >
                                      Mint one!
                                    </button>
                                  </div>
                                </div>
                                )
                              : (
                                <button
                                  className='mb-3 inline-block w-full rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] backgroundGradiant'
                                  type='button'
                                  onClick={onClickConnect}
                                >
                                  Log in with Metamask
                                </button>
                                )}

                            {errorMessage !== '' && (
                              <p className='text-red-500 text-xl mt-8'>{errorMessage}</p>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                    <div
                      className='flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none backgroundGradiant'
                    >
                      <div className='px-4 py-6 text-white md:mx-6 md:p-12'>
                        <h4 className='mb-6 text-xl font-semibold'>
                          What is this project?
                        </h4>
                        <p className='text-sm'>This project wants to implement a simple login via NFT.<br /><br />
                          The user can mint his NFT in order to join the community.<br /><br />In order to mint NFT, you must first be admitted to the whitelist. So the user will first need to request that his wallet address be whitelisted.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
