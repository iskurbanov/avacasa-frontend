import Head from 'next/head'
import { Login } from '../components/Login'
import { useMoralis } from 'react-moralis'

export default function Home() {
  const { isAuthenticated, logout } = useMoralis()

  if (!isAuthenticated) return <Login />

  return (
    <div className="">
      <Head>
        <title>Casavax - Home of Avax</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to the app</h1>
      <button className="" onClick={logout}>Logout</button>
    </div>
  )
}
