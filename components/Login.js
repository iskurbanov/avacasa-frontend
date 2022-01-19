import Image from "next/image"
import { useMoralis } from "react-moralis"
import Steps from "./Steps"

export const Login = () => {
  const { authenticate, isAuthenticating } = useMoralis()

  return (
    <div className="">
      <div className="relative max-w-4xl m-auto my-36 md:my-48 h-full">
        <div className="absolute -top-96 -left-64 bg-lime-50 h-96 w-96 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 -left-48 bg-emerald-50 h-96 w-96 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -top-80 -right-48 bg-blue-50 h-96 w-96 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -top-0 -right-48 bg-fuchsia-50 h-96 w-96 rounded-full blur-3xl -z-10"></div>
        <div className="flex flex-col w-full items-center justify-center space-y-4 relative">
          <p className="text-pink-600 font-bold">Introducing</p>
          <h1 className="text-4xl px-8 text-center md:text-5xl font-bold">The Crypto-Native Homepage for the Avalanche Community</h1>
          {/* <h1 className="text-4xl px-8 text-center md:text-5xl font-bold">The Crypto-Native Homepage for the <span className="relative">Avalanche<span className="bg-red-400 absolute top-0 left-0 w-full h-full -z-10 -skew-x-12 blur-lg"></span></span> Community</h1> */}
          <p className="px-8 text-center opacity-50">Connect with the Avax community, share information, collect donations.</p>
          <div className="relative group">
            <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-pink-600 to-purple-600 blur-md opacity-75 group-hover:opacity-100 animate-tilt transition-opacity"></div>
            <button onClick={authenticate} className="relative px-4 py-2 font-medium rounded-full text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">{!isAuthenticating ? "Claim My Profile" : "Authenticating..."}</button>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto h-4/6 pb-36 px-4">
        <div className="">
          <img src="/screenshot.png" className="rounded-2xl shadow-2xl overflow-hidden w-full h-full" />
        </div>
      </div>
      <Steps />
    </div>
  )
}
