import { useNFTBalances } from 'react-moralis'
import { useVerifyMetadata } from "../hooks/useVerifyMetadata"


const Nfts = () => {
  const { data: NFTBalances } = useNFTBalances();
  const { verifyMetadata } = useVerifyMetadata();

  return (
    <div className="pb-12">
      <h2 className="">
        Choose which of your NFTs you want to display!
      </h2>
      <div className="flex">
        {NFTBalances?.result &&
          NFTBalances.result.map((nft, index) => {
            nft = verifyMetadata(nft)
            return (
              <img
                key={index}
                src={nft?.image}
                className="object-contain h-48 w-48"
                // style={{
                //   backgroundImage: 'url("https://cdn.shopify.com/s/files/1/2618/8176/files/no-image-found.png?v=3919685981083119590")'
                // }}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "https://cdn.shopify.com/s/files/1/2618/8176/files/no-image-found.png?v=3919685981083119590";
                }}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Nfts
