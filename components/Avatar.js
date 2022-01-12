import Image from "next/image"
import { useMoralis } from "react-moralis"

export const Avatar = ({ username }) => {

  const { user } = useMoralis()
  return (
    <Image
      src={`https://avatars.dicebear.com/api/identicon/${username || user.get('username')}.svg`}
      layout="fill"
      className="rounded-full bg-white"
    />
  )
}
