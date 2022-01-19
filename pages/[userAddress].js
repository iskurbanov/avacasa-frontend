import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'

export default function UserAddress({ userAddress }) {
  const [loading, setLoading] = useState(true)
  const { user, logout } = useMoralis()

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


  return (
    <div className="relative bg-stone-50">
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
      {/* {
        !user &&
        <button className="fixed top-0 right-0 z-50 rounded-full w-24 h-12 bg-black text-white m-4 shadow">
          Donate
        </button>
      } */}
      <div className="relative w-full h-64 rounded-b-md">
        <Image src="/Portage.jpg" layout="fill" className="rounded-b-3xl" />
        <div className="rounded-full flex justify-center md:justify-start w-full md:w-48 h-48 absolute -bottom-24 left-0 md:left-24 right-0">
          <img className="bg-white rounded-full object-cover h-48 w-48 border-white border-4" src={data[0]?.attributes.avatar} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl mx-auto w-full h-64 p-8 mt-24">
          <h1 className="text-4xl font-semibold mb-2">{data[0]?.attributes.link}</h1>
          <pre className="text-gray-600">{data[0]?.attributes.about}</pre>
        </div>
        <h2 className="mt-8 mb-1 px-8 font-semibold text-2xl">My NFT Collection</h2>
        <div className="rounded-3xl mx-auto w-full p-8">
          <div className="flex flex-col md:flex-row justify-start gap-4">
            {
              data[0]?.attributes.NFTs.map(item => (
                <div key={item} className="rounded-2xl bg-white shadow min-w-64 h-80 flex flex-col gap-1.5 items-center justify-start hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                  <img className="max-h-64" src={item} />
                  <p className="text-gray-500 text-left w-full pl-4">Name of Collection</p>
                  <h3 className="font-semibold text-xl text-left w-full pl-4">Name of NFT</h3>
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