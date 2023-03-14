import Head from 'next/head'
export default function Home () {
  return (
    <>
      <Head>
        <title>Welcome to my app</title>
        <meta name='description' content='Welcome to my app' />
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
                            <button
                              className='mb-3 inline-block w-full rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] backgroundGradiant'
                              type='button'
                            >
                              Log in with Metamask
                            </button>
                          </div>
                          <div className='flex items-center justify-between pb-6'>
                            <p className='mb-0 mr-2'>Don't have an NFT?</p>
                            <button
                              type='button'
                              className='inline-block rounded border-2 border-danger px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
                            >
                              Mint one!
                            </button>
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
