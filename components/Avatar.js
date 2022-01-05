import Image from "next/image"
import { useMoralis } from "react-moralis"

export const Avatar = ({ username, logoutOnPress }) => {

  const { user, logout } = useMoralis()
  return (
    <Image
      src={`https://avatars.dicebear.com/api/pixel-art/${username || user.get('username')}.svg`}
      layout="fill"
      className="rounded-full cursor-pointer hover:opacity-75 bg-black"
      onClick={() => logoutOnPress && logout()}
    />
  )
}
