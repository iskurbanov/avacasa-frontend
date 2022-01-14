import Head from 'next/head'
import Image from 'next/image'
import { useMoralis } from 'react-moralis'
import { Avatar } from '../components/Avatar'
import Dashboard from '../components/Dashboard'
import { Login } from '../components/Login'
import Nfts from '../components/Nfts'



export default function Home() {
  const { user, isAuthenticated } = useMoralis()

  if (!isAuthenticated) return <Login />

  return (
    <div className="">
      <Head>
        <title>Casavax - Home of Avax</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-4xl mx-auto px-8">
        <h2 className="text-3xl text-center mt-16">Welcome to your Dashboard!</h2>
        <div className="md:flex md:flex-row py-12 flex flex-col justify-center items-center">
          <div className="relative h-8 w-8">
            <Avatar />
          </div>
          <h1 className="md:text-xl text-center md:pl-4">
            {user.get("ethAddress")}
          </h1>
        </div>

        <Nfts />
        <Dashboard />
      </div>
    </div>
  )
}

export async function getServerSideProps() {


  return {
    props: {

    }
  }
}