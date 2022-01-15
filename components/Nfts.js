import { useNFTBalances } from 'react-moralis'
import { useVerifyMetadata } from "../hooks/useVerifyMetadata"


const Nfts = ({ selectNft, setSelectNft }) => {
  const { data: NFTBalances } = useNFTBalances();
  const { verifyMetadata } = useVerifyMetadata();


  const handleSelectNft = (imageSrc) => {
    const nftImages = selectNft

    if (!nftImages.includes(imageSrc)) {
      nftImages.push(imageSrc)
      setSelectNft(nftImages)
    } else {
      nftImages.splice(nftImages.indexOf(imageSrc), 1)
    }

    console.log(nftImages)
  }

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
              {NFTBalances?.result &&
                NFTBalances.result.map((nft, index) => {
                  nft = verifyMetadata(nft)
                  return (
                    <div key={index} className="relative" onClick={() => handleSelectNft(nft.image)}>
                      <img
                        src={nft?.image}
                        className="object-contain h-48 w-48"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null
                          currentTarget.src = "https://cdn.shopify.com/s/files/1/2618/8176/files/no-image-found.png?v=3919685981083119590";
                        }}
                      />
                      <p className={`absolute top-0 left-0 ${selectNft.includes(nft.image) ? null : "hidden" }`}>Saved</p>
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
