import Image from 'next/image'
import { useMoralis, useMoralisQuery } from 'react-moralis'

export default function UserAddress({ userAddress }) {

  const { data, error, isLoading } = useMoralisQuery(
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

  if (isLoading) return <p>loading...</p>


  return (
    <div className="relative">
      <div className="relative w-full h-64 rounded-b-md">
        <Image src="/Portage.jpg" layout="fill" className="rounded-b-3xl" />
        <div className="rounded-full flex justify-center md:justify-start w-full md:w-48 h-48 absolute -bottom-24 left-0 md:left-24 right-0">
          <img className="bg-white rounded-full object-cover h-48 w-48 border-white border-4" src={data[0]?.attributes.avatar} />
        </div>
      </div>
      <div className="bg-white rounded-3xl max-w-5xl mx-auto w-full h-64 p-8 mt-24">
        <h1 className="text-4xl font-semibold mb-2">{data[0]?.attributes.link}</h1>
        <pre className="text-gray-600">{data[0]?.attributes.about}</pre>
      </div>
      <h2 className="mt-8 mb-1 pl-12 font-semibold text-2xl">My NFT Collection</h2>
      <div className="bg-white rounded-3xl max-w-5xl mx-auto w-full h-64 p-8">
        <div className="flex justify-start gap-4">
          {
            data[0]?.attributes.NFTs.map(item => (
              <div className="rounded-2xl shadow w-64 h-80 flex flex-col gap-1.5 items-center justify-start hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                <img key={item} className="max-h-64" src={item} />
                <p className="text-gray-500 text-left w-full pl-4">Name of Collection</p>
                <h3 className="font-semibold text-xl text-left w-full pl-4">Name of NFT</h3>
              </div>
            ))
          }
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