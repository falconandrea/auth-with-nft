import Head from 'next/head'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Whitelist from './../artifacts/contracts/Whitelist.sol/Whitelist.json'
import { truncateAddress, checkNFT, checkWL, checkRequestWL, requestWL } from '@/utils/functions'

export default function Home () {
  const [currentAccount, setCurrentAccount] = useState('')
  const [signer, setSigner] = useState('')
  const [chainId, setChainId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [requestPending, setRequestPending] = useState(false)
  const [nft, setNft] = useState(null)
  const [inWhitelist, setInWhitelist] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  // Listeners on account change and network change
  useEffect(() => {
    setErrorMessage('')

    if (!window.ethereum) {
      setErrorMessage('Please install MetaMask')
      return
    }

    window.ethereum.on('accountsChanged', function (accounts) {
      setCurrentAccount(accounts[0])
      window.location.reload()
    })

    window.ethereum.on('chainChanged', function (networkId) {
      setChainId(networkId)
      window.location.reload()
    })
  }, [])

  const loadData = async () => {
    // Connect to account in MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signerAccount = await provider.getSigner()
    setSigner(signerAccount)
    const address = await signerAccount.getAddress()
    setCurrentAccount(address)

    const network = await provider.getNetwork()
    const networkId = network.chainId
    console.log('networkId', networkId)

    if (networkId === parseInt(process.env.NEXT_PUBLIC_NETWORK_CHAINID)) {
      setShowButtons(true)
      setChainId(networkId)

      setShowLoading(true)
      let result = await checkNFT()
      if (result.status === 'success') {
        setNft(result.data)
      }

      const factory = new ethers.Contract(process.env.NEXT_PUBLIC_WHITELIST_ADDRESS, Whitelist.abi, signerAccount)
      result = await checkWL(factory, address)
      if (result.status === 'success') {
        setInWhitelist(result.data)
      } else {
        setErrorMessage(result.data)
      }

      result = await checkRequestWL(address)
      if (result.status === 'success') {
        setRequestPending(result.data)
      }
      setShowLoading(false)
    } else {
      setShowButtons(false)
      setErrorMessage(`You have to switch on ${process.env.NEXT_PUBLIC_NETWORK_CHAINNAME} Network`)
    }
  }

  // Connect to wallet
  const onClickConnect = async () => {
    loadData()
  }

  // Click on request to add to whitelist
  const onClickRequestWL = async (address) => {
    const result = await requestWL(address)
    if (result.status === 'success') {
      setRequestPending(result.data)
    } else {
      setErrorMessage(result.data)
    }
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
        {showLoading && (
          <div className='bg-gray-200 h-full w-full absolute top-0 left-0 z-10 opacity-80 text-center'>
            <svg className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 inline-block mt-32' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor' />
              <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill' />
            </svg>
          </div>
        )}
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
                                  <p className='mb-16'>Welcome {truncateAddress(currentAccount)}!</p>

                                  {showButtons && (
                                    <div>
                                      <div className='flex items-center justify-between pb-6 mt-2'>
                                        <p>Do you have the NFT?</p>
                                        {nft
                                          ? (
                                            <p>Yes</p>
                                            )
                                          : (
                                              inWhitelist
                                                ? (
                                                  <button
                                                    type='button'
                                                    className='inline-block rounded border-2 border-danger px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
                                                  >
                                                    Mint one!
                                                  </button>
                                                  )
                                                : (
                                                  <p>You are not in whitelist</p>
                                                  )
                                            )}
                                      </div>

                                      <div className='flex items-center justify-between pb-6 mt-2'>
                                        <p>Are you in Whitelist?</p>
                                        {inWhitelist
                                          ? (
                                            <p>Yes</p>
                                            )
                                          : (
                                            <p>No</p>
                                            )}
                                      </div>

                                      <div className='flex items-center justify-between pb-6 mt-2'>
                                        <p>Have you request to access to Whitelist?</p>
                                        {requestPending
                                          ? (
                                            <p>Yes</p>
                                            )
                                          : (
                                            <button
                                              type='button'
                                              onClick={() => onClickRequestWL(currentAccount)}
                                              className='inline-block rounded border-2 border-danger px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
                                            >
                                              Request!
                                            </button>
                                            )}
                                      </div>
                                    </div>
                                  )}
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
