import Image from "next/image"
import { useMoralis } from "react-moralis"

export const Login = () => {
  const { authenticate, isAuthenticating } = useMoralis()

  return (
    <div className="relative max-w-4xl m-auto">
      <div className="flex flex-col absolute z-50 h-3/6 w-full items-center justify-center space-y-4">
        <p className="text-indigo-600 font-bold">Introducing</p>
        <h1 className="text-4xl px-8 text-center md:text-5xl font-bold">The Crypto-Native Homepage for the <span className="relative">Avalanche<span className="bg-red-400 absolute top-0 left-0 w-full h-full -z-10 -skew-x-12 blur-lg"></span></span> Community</h1>
        <p className="px-8 text-center opacity-50">Connect with the Avax community, share information, collect donations.</p>
        <button onClick={authenticate} className="px-4 py-2 font-medium rounded-full text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{!isAuthenticating ? "Claim My Profile" : "Authenticating..."}</button>
      </div>
    </div>
  )
}
