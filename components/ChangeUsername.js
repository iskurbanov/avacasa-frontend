import { useMoralis } from "react-moralis"

export const ChangeUsername = () => {
  const { setUserData, isUserUpdating, userError, user } = useMoralis()

  const setUserName = () => {
    const username = prompt(`Enter your new username (current: ${user.getUsername()})`)

    if (!username) return

    setUserData(({ username }))
  }

  return (
    <div className="text-sm absolute top-5 right-5 ">
      <button disabled={isUserUpdating}
        onClick={setUserName} className="hover:text-pink-700">Change your username</button>
    </div>
  )
}
