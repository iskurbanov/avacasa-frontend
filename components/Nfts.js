import { useEffect, useState } from 'react';
import { useNFTBalances } from 'react-moralis'
import { useVerifyMetadata } from "../hooks/useVerifyMetadata"
import { CheckCircle } from '@heroicons/react/solid'


const Nfts = ({ dashboardInput, setDashboardInput, data, setSaveLoading }) => {
  const { data: NFTBalances, isLoading } = useNFTBalances();
  const { verifyMetadata } = useVerifyMetadata();
  const [chosen, setChosen] = useState([])

  useEffect(() => {
    setChosen(data[0]?.attributes.NFTs)
  }, [data])


  const handleSelectNft = (imageSrc) => {
    const nftImages = dashboardInput.NFTs

    if (nftImages?.includes(imageSrc)) {
      nftImages.splice(nftImages.indexOf(imageSrc), 1)
    } else {
      nftImages.push(imageSrc)
    }

    setDashboardInput({ ...dashboardInput, NFTs: nftImages })
    setSaveLoading(false)
  }

  if (isLoading) return <p>loading...</p>

  return (
    <div className="pb-12">
      {
        NFTBalances?.total === 0 ?
          <div className="py-12">
            <p>You don't have any NFTs yet... Buy some to display on your page. </p>
          </div>
          :
          <div className="">
            <h2 className="">
              Choose which of your NFTs you want to display!
            </h2>
            <div className="flex">
              {
                NFTBalances?.result &&
                NFTBalances.result.map((nft, index) => {
                  nft = verifyMetadata(nft)
                  return (
                    <div key={index} className="relative" >
                      {
                        nft.image ?
                          <div className="px-1">
                            <img
                              onClick={(e) => {
                                handleSelectNft(nft.image)
                                setChosen({ ...chosen })
                              }}
                              src={nft.image}
                              id={`select-${index}`}
                              className={`bg-white object-contain h-48 w-48 hover:shadow-xl ${dashboardInput.NFTs.includes(nft?.image) ? "border-2 border-indigo-600" : "border-2 border-black"}`}
                              onError={(e) => {
                                e.target.style.display = 'none'
                                // e.currentTarget.onerror = null
                                // e.currentTarget.src = "https://cdn.shopify.com/s/files/1/2618/8176/files/no-image-found.png?v=3919685981083119590"
                              }}
                            />
                            {
                              dashboardInput.NFTs.includes(nft?.image) &&
                              <div className="absolute top-1 left-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                            }
                          </div>
                          :
                          null
                      }

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
