import axios from 'axios';
import { useEffect, useState } from 'react';
import { useVerifyMetadata } from "../hooks/useVerifyMetadata"
import toast, { Toaster } from 'react-hot-toast';


const Nfts = ({ dashboardInput, setDashboardInput, data, setSaveLoading, userAddress }) => {
  // const { data: NFTBalances, isLoading } = useNFTBalances();
  const { verifyMetadata } = useVerifyMetadata();
  const [loading, setLoading] = useState(true)
  const [covalentNFTs, setCovalentNFTs] = useState([])

  const covalentToken = "ckey_1289dee4377743c197571d8e18e"

  const notify = () => toast.error('There was a problem fetching your NFTs');

  useEffect(() => {
    axios
      .get(`https://api.covalenthq.com/v1/43114/address/${userAddress}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=${covalentToken}`)
      .then(res => {
        const filtered = res.data.data.items.filter(item => item.nft_data !== null)

        const NFTs = []
        filtered.map(item => {
          item.nft_data.map(nft => NFTs.push(nft))
        })

        const nftWithPrice = NFTs.map(item => {
          if (dashboardInput.NFTs.length > 0) {
            for (let i = 0; i < dashboardInput.NFTs.length; i++) {
              console.log(dashboardInput.NFTs[i]?.price)
              if (item.token_id === dashboardInput.NFTs[i].token_id) {
                return { ...item, price: dashboardInput.NFTs[i].price }
              } else {
                return { ...item, price: 0 }
              }
            }
          }
        })

        setCovalentNFTs(nftWithPrice)
        setLoading(false)
      })
      .catch(err => {
        // setCovalentNFTs(dashboardInput.NFTs)
        // setLoading(false)
        // notify()
        console.error(err)
      })
  }, [dashboardInput])


  const handleSelectNft = (selectedNFT) => {
    const currentNFTs = dashboardInput.NFTs

    console.log("selectedNFT", selectedNFT)

    if (currentNFTs.some(item => item.token_id === selectedNFT.token_id)) {
      // currentNFTs.splice(currentNFTs.indexOf(selectedNFT), 1)
      let filtered = currentNFTs.filter(item => item.token_id !== selectedNFT.token_id)
      currentNFTs = filtered
    } else {
      currentNFTs.push(selectedNFT)
    }

    console.log("currentNFTs", currentNFTs)

    setDashboardInput({ ...dashboardInput, NFTs: currentNFTs })
    setSaveLoading(false)
  }

  const handlePriceChange = (e, nft) => {

    const updatedPrice = { ...nft, price: e.target.value }

    const index = covalentNFTs.findIndex(item => item.token_id === nft.token_id)

    const newNFTs = covalentNFTs
    newNFTs[index] = updatedPrice
    console.log("newnfts", newNFTs)

    setCovalentNFTs(newNFTs)

    const currentNFTs = dashboardInput.NFTs
    if (currentNFTs.some((item, index) => item.token_id === nft.token_id)) {
      currentNFTs[index] = updatedPrice
    }

    console.log("current", currentNFTs)

    setDashboardInput({ ...dashboardInput, NFTs: currentNFTs })
  }

  return (
    <div className="pb-12 pt-2">
      <Toaster position="bottom-center" />
      {
        loading ? <p>loading...</p> :
          <div>
            {
              covalentNFTs.length === 0 ?
                <div className="py-12">
                  <p>You don't have any NFTs yet... Buy some to display on your page. </p>
                </div>
                :
                <div className="">
                  <h2 className="text-lg">
                    Choose which of your NFTs you want to display!
                  </h2>
                  <div className="flex p-3 overflow-x-scroll">
                    {
                      covalentNFTs.map(nft => (
                        nft && nft.external_data &&
                        <div key={nft.token_id} className="relative">
                          <div className="shadow h-64 w-64 flex flex-col items-center justify-start hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                            <img
                              // id={`select-${nft.token_id}`}
                              onClick={(e) => {
                                handleSelectNft(nft)
                              }}
                              src={nft.external_data?.image ? nft.external_data.image : nft.external_data.image_256}
                              className={`w-64 h-64 ${loading ? "hidden" : "inline-block"} mr-1 ${dashboardInput.NFTs.some(item => item.token_id === nft.token_id) ? "border-2 border-black" : "border-2 border-gray-400"}`}
                              onError={(e) => {
                                e.target.style.display = 'none'
                              }}
                            />
                            {
                              dashboardInput.NFTs.some(item => item.token_id === nft.token_id) &&
                              <div className="absolute top-1 left-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                            }
                          </div>
                          <div className="flex items-center space-x-2 px-5 pt-2">
                            <input
                              type="text"
                              name="price"
                              id={`price-${nft.token_id}`}
                              maxLength="5"
                              autoComplete="price"
                              value={nft.price}
                              onChange={e => handlePriceChange(e, nft)}
                              className="flex w-24 focus:ring-black focus:border-black min-w-0 rounded-md sm:text-sm border-gray-300"
                            />
                            <label htmlFor={`price-${nft.token_id}`} className="block text-sm font-medium text-gray-700">
                              AVAX
                            </label>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
            }
          </div>
      }
    </div>
  )
}

export default Nfts
