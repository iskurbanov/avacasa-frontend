import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { Avatar } from '../components/Avatar'
import Dashboard from '../components/Dashboard'
import Layout from '../components/Layout'
import { Login } from '../components/Login'
import Nfts from '../components/Nfts'



export default function Home() {
  const { refetchUserData, user, isAuthenticated, account } = useMoralis()


  return (
    <Layout>
      <Head>
        <title>AvaCasa - Your NFT Shop</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Your personal NFT Shop on the Avalanche Network" />
        <meta name="keywords" content="avalanche,moralis,next.js,tailwindcss" />
        <meta property="og:title" content="AvaCasa" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avacasa.xyz/" />
        <meta property="og:image" content="https://avacasa.xyz/screenshot2.png" />
        <meta property="og:description" content="Your personal NFT Shop on the Avalanche Network" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="AvaCasa" />
      </Head>
      {
        !isAuthenticated ? <Login />
          :
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
            <Dashboard />
          </div>
      }

    </Layout>
  )
}

export async function getServerSideProps() {


  return {
    props: {

    }
  }
}