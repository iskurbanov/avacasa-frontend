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
    <div className="relative pt-12">
      <div className="rounded-full flex justify-center w-full absolute top-12 left-0 right-0">
        <img className="bg-white rounded-full object-cover h-48 w-48 border-indigo-600 border-2" src={data[0]?.attributes.avatar} />
      </div>
      <div className="bg-white shadow rounded-3xl max-w-5xl mx-auto w-full h-64 p-8 mt-24 border-indigo-600 border-2">
        <h1>{data[0]?.attributes.link}</h1>
        <h2>{data[0]?.attributes.about}</h2>
      </div>
      <h2 className="mt-8 mb-1 pl-12 font-semibold text-2xl">My NFT Collection</h2>
      <div className="bg-white shadow rounded-3xl max-w-5xl mx-auto w-full h-64 p-8 border-indigo-600 border-2">
        <div className="flex">
          {
            data[0]?.attributes.NFTs.map(item => (
              <img key={item} className="h-48 w-48" src={item} />
            ))
          }
        </div>
      </div>
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