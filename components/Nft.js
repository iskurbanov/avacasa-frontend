import axios from "axios"
import { useEffect } from "react"

const Nft = () => {

  useEffect(() => {
    axios.get('https://api.covalenthq.com/v1/43114/xy=k/traderjoe/tokens/?quote-currency=USD&format=JSON&key=ckey_8078a8b639b34969bf8ef60b67c')
      .then(response => console.log(response.data))
      .catch(error => console.log(error))
  }, [])

  return (
    <div>
      NFT
    </div>
  )
}

export default Nft
