import { useMoralis, useMoralisQuery } from 'react-moralis'

export default function UserAddress({ userAddress }) {

  const { data, error, isLoading } = useMoralisQuery(
    'User',
    (query) => query
      .ascending('createdAt'),
    [],
    {
      live: true
    }
  )

  console.log(data)

  return (
    <div>
      {/* <h1>User Address Page</h1> */}
      <h2>{data[0]?.attributes.username}</h2>
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