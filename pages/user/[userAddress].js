import { useMoralis, useMoralisQuery } from 'react-moralis'

export default function UserAddress({ userAddress }) {

  const { data, error, isLoading } = useMoralisQuery(
    'Pages',
    (query) => query
      .equalTo('ethAddress', userAddress),
    [],
    {
      live: true
    }
  )

  if (isLoading) return <p>loading...</p>

  console.log(data)

  return (
    <div>
      <h1>{data[0]?.attributes.link}</h1>
      <h2>{data[0]?.attributes.about}</h2>
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