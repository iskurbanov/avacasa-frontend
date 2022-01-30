import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import Modal from '../components/Modal'

export default function UserAddress({ userAddress }) {
  const [loading, setLoading] = useState(true)
  const { user, logout, Moralis, authenticate, isAuthenticating, isAuthenticated } = useMoralis()
  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  const { data, error, isLoading, isFetching } = useMoralisQuery(
    'Pages',
    (query) =>
      userAddress.length > 40 ?
        query
          .equalTo('ethAddress', userAddress)
        :
        query
          .equalTo('link', userAddress)
    ,
    [],
    {
      live: true
    }
  )

  useEffect(() => {
    if (data[0]?.attributes.link) setLoading(false)
  }, [data])

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner-grow inline-block rounded-full animate-bounce" role="status">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
        </svg>
      </div>
    </div>
  )


  const openModal = (data) => {
    setOpen(true)
    setModalData(data)
  }

  return (
    <div className="relative bg-stone-50">
      <Modal open={open} setOpen={setOpen} modalData={modalData} />
      {
        data[0]?.attributes.ethAddress && data[0]?.attributes.ethAddress === user?.get("ethAddress") &&
        <div className="full mx-auto px-5 h-8 bg-black text-white font-semibold flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard
            </div>
          </Link>
          <div onClick={logout} className="cursor-pointer">
            Logout
          </div>
        </div>
      }
      <div className="relative w-full h-64 rounded-b-md">
        <Image src="/Portage.jpg" layout="fill" className="rounded-b-3xl object-cover" priority />
        <div className="rounded-full flex justify-center w-full h-48 absolute -bottom-24 left-0 right-0">
          <img className="bg-white rounded-full object-cover h-48 w-48 border-white border-4" src={data[0]?.attributes.avatar} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mt-24 sm:flex-row">
          <div className="rounded-3xl mx-auto w-full h-64 p-8">
            <h1 className="text-4xl font-semibold mb-2">{data[0]?.attributes.name}</h1>
            <pre className="text-gray-600">{data[0]?.attributes.about}</pre>
          </div>
          {/* {
            user?.attributes.ethAddress !== userAddress &&
            <div className="px-4 md:px-0 mb-16 md:mb-0">
              <div className="flex flex-col justify-around rounded-3xl w-full sm:w-80 min-w-64 bg-white border-2 border-black text-black sm:m-4 shadow-xl text-center py-4">
                Send me AVAX
                <div className="flex justify-between px-2 py-2 divide-y">
                  <div className="border border-gray-300 bg-white rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-black focus-within:border-black w-16 mr-6">
                    <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                      AVAX
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="block text-center w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="1.0"
                    />
                  </div>
                  {
                    !isAuthenticated ?
                      <button onClick={authenticate} className="bg-black text-white p-4 rounded-xl flex">
                        {
                          !isAuthenticating ?
                            <span className='mr-3'>Sign in to send</span>
                            :
                            <span className='mr-3'>Authenticating...</span>
                        }
                        <Image src="/metamask.png" height={20} width={20} />
                      </button>
                      :
                      <button onClick={sendAvax} className="bg-black text-white p-4 rounded-xl flex">
                        Send
                      </button>
                  }
                </div>
                <div className="border-b-2">
                  Recently sent
                </div>
                <div className="flex flex-col divide-y">
                  <div className="flex px-4 py-0.5">
                    1.2 AVAX from 0x67a...h391
                  </div>
                  <div className="flex px-4 py-0.5">
                    2 AVAX from 0x488...a983
                  </div>
                </div>
              </div>
            </div>
          } */}
        </div>
        {
          data[0]?.attributes.NFTs.length > 0 &&
          <h2 className="mt-2 mb-1 px-8 font-semibold text-2xl">My NFT Collection</h2>
        }
        {/* <div className="rounded-3xl mx-auto w-full p-8">
          <div className="flex flex-col md:flex-row md:flex-wrap justify-start gap-4">
            {
              data[0]?.attributes.NFTs.map(item => (
                <div key={item.token_id} className="rounded-2xl bg-white shadow flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                  <div className="min-w-64 max-w-80 md:w-64 h-full w-full">
                    <img className="rounded-2xl object-cover md:w-64 w-full" src={item.external_data.image} />
                  </div>
                  <div className="flex items-center justify-center h-full">
                    <h3 className="font-semibold text-xl text-left w-full py-3">{item.external_data.name}</h3>
                  </div>
                </div>
              ))
            }
          </div>
        </div> */}
        <div className="rounded-3xl mx-auto w-full p-8">
          <div className="flex flex-col md:flex-row md:flex-wrap justify-start gap-4">
            {
              data[0]?.attributes.NFTs.map(item => (
                <div key={item.image} className="rounded-2xl bg-white shadow flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer" onClick={() => openModal(item)}>
                  <div className="min-w-64 max-w-80 md:w-64 h-full w-full">
                    <img className="rounded-2xl object-cover md:w-64 w-full"
                      src={item.image}
                      onError={(e) => {
                        // e.target.style.display = 'none'
                        e.currentTarget.onerror = null
                        e.currentTarget.src = "https://cdn.shopify.com/s/files/1/2618/8176/files/no-image-found.png?v=3919685981083119590"
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center h-full w-full pl-5 py-2 space-y-2">
                    <h3 className="font-semibold text-xl text-left w-full">{item.metadata ? item.metadata.name : item.name}</h3>
                    <p className="text-md text-left w-full">{!item.price || item.price === "0" ? "Not for sale" : item.price + " " + "AVAX"}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <footer className="py-24"></footer>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const userAddress = params.userAddress

  return {
    props: {
      userAddress,
    }
  }
}