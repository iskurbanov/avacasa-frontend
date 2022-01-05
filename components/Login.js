import Image from "next/image"
import { useMoralis } from "react-moralis"

export const Login = () => {
  const { authenticate, isAuthenticating } = useMoralis()

  return (
    <div className="bg-black relative">
      <h1>Login screen</h1>
      <div className="flex flex-col absolute z-50 h-4/6 w-full items-center justify-center space-y-4">
        <Image className="object-cover rounded-full" src="https://links.papareact.com/3pi" alt="background" height={200} width={200} />

        <button onClick={authenticate} className="bg-yellow-500 rounded-lg px-5 py-3 font-bold animate-pulse">{!isAuthenticating ? "Login" : "Initializing..."}</button>
      </div>
      <div className="w-full h-screen">
        <Image src="https://links.papareact.com/55n" alt="background" layout="fill" objectFit="cover" />
      </div>
    </div>
  )
}
