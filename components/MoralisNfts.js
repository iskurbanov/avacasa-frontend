import { useEffect, useState } from 'react';
import { useNFTBalances } from 'react-moralis'
import { useVerifyMetadata } from "../hooks/useVerifyMetadata"


const Nfts = ({ offerNFT, dashboardInput, setDashboardInput, setSaveLoading }) => {
  const { data: NFTBalances } = useNFTBalances()
  const { verifyMetadata } = useVerifyMetadata()
  const [loading, setLoading] = useState(true)
  const [mainNFTs, setMainNFTs] = useState([])

  const handleSelectNft = (selectedNFT) => {
    const currentNFTs = dashboardInput.NFTs

    if (currentNFTs?.some(item => item["image"] === selectedNFT.image)) {
      let filtered = currentNFTs.filter(item => item.token_id !== selectedNFT.token_id)
      currentNFTs = filtered
    } else {
      currentNFTs.push(selectedNFT)
    }

    setDashboardInput({ ...dashboardInput, NFTs: currentNFTs })
    setSaveLoading(false)
  }

  const handlePriceChange = (e, nft) => {

    const updatedPrice = { ...nft, price: e.target.value }

    const index = mainNFTs.findIndex(item => item.token_id === nft.token_id)

    const newNFTs = mainNFTs
    newNFTs[index] = updatedPrice

    setMainNFTs(newNFTs)

    const nftWithPrice = dashboardInput.NFTs.map((item, index) => {
      if (dashboardInput.NFTs.length > 0) {
        for (let i = 0; i < newNFTs.length; i++) {
          if (item.token_id === newNFTs[i].token_id) {
            return { ...item, price: newNFTs[i].price }
          }
        }
      }
    })

    setMainNFTs(newNFTs)
    setDashboardInput({ ...dashboardInput, NFTs: nftWithPrice })
    setSaveLoading(false)
  }

  useEffect(() => {
    if (NFTBalances?.result) {

      const result = NFTBalances.result.map(x => dashboardInput.NFTs.find(item => item.token_id === x.token_id) || x)

      setMainNFTs(result)
      setLoading(false)
    }
  }, [NFTBalances])

  return (
    <div className="pb-12 pt-3">
      {
        mainNFTs?.total === 0 ?
          <div className="py-12">
            <p>You don't have any NFTs yet... Buy some to display on your page. </p>
          </div>
          :
          <div className="">
            <h2 className="">
              Choose which of your NFTs you want to display!
            </h2>
            <div className="flex p-3 overflow-x-scroll">
              {
                mainNFTs &&
                mainNFTs.map((nft, index) => {
                  nft = verifyMetadata(nft)
                  return (
                    <div key={index} className="relative" >
                      <div className="border">
                        <div className="border-b h-full w-64 flex flex-col items-center justify-start hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                          <img
                            onClick={(e) => {
                              handleSelectNft(nft)
                            }}
                            onLoad={() => setLoading(false)}
                            src={nft.image}
                            id={`select-${index}`}
                            className={`w-64 h-64 ${loading ? "hidden" : "inline-block"} mr-1 ${dashboardInput.NFTs.some(item => item.token_id === nft?.token_id) ? "border-2 border-black" : "border-2 border-gray-400"}`}
                            onError={(e) => {
                              // e.target.style.display = 'none'
                              e.currentTarget.onerror = null
                              e.currentTarget.src = "https://cdn.shopify.com/s/files/1/2618/8176/files/no-image-found.png?v=3919685981083119590"
                            }}
                          />
                          {
                            dashboardInput.NFTs.some(item => item.token_id === nft?.token_id) &&
                            <div className="absolute top-1 left-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          }
                          <div className="py-2 font-semibold">{nft.metadata ? nft.metadata.name : nft.name}</div>
                        </div>
                        <div className="flex items-center space-x-2 px-5 py-2">
                          <input
                            type="text"
                            name="price"
                            id={`price-${nft.token_id}`}
                            maxLength="5"
                            autoComplete="price"
                            value={nft.price ? nft.price : 0}
                            onChange={e => handlePriceChange(e, nft)}
                            className="flex w-24 focus:ring-black focus:border-black min-w-0 rounded-md sm:text-sm border-gray-300"
                          />
                          <label htmlFor={`price-${nft.token_id}`} className="block text-sm font-medium text-gray-700">
                            AVAX
                          </label>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
      }
    </div>
  )
}

export default Nfts