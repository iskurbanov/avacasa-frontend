import Link from "next/link"
import { useEffect, useState } from "react"
import { useMoralis, useMoralisQuery, useMoralisCloudFunction } from "react-moralis"
import toast, { Toaster } from 'react-hot-toast';
import MoralisNfts from "./MoralisNfts";
import Web3 from 'web3';



const Dashboard = () => {
  const { user, Moralis } = useMoralis()
  const [saveLoading, setSaveLoading] = useState(false)
  const [available, setAvailable] = useState(false)
  const [dashboardInput, setDashboardInput] = useState(
    {
      name: '',
      link: '',
      about: '',
      NFTs: [],
      avatar: `https://avatars.dicebear.com/api/identicon/${username}.svg`
    }
  )
  const username = user.get('username')
  const nft_market_place_address = "0x9eeEd75cb63Dd447522E8a17cd5115594734dE51"


  async function offerNFT(nft) {

    const price = Moralis.Units.ETH("1")
    const contract = nft.token_address
    const tokenId = nft.token_id
    
    try {
    const approval = await approveMarketPlace(contract, tokenId);
    const offering = await placeOffering(contract, tokenId, price);
    console.log(offering)
    } catch(err) {
      console.error(err)
    }

    console.log(price)
  }

  async function placeOffering(_hostContract, _tokenId, _price) {
    const params = {
      hostContract: _hostContract,
      offerer: ethereum.selectedAddress,
      tokenId: _tokenId,
      price: _price
    }
    const signedTransaction = await Moralis.Cloud.run("placeOffering", params);
    const fulfillTx = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    return fulfillTx;
  }

  async function approveMarketPlace(hostContract, tokenId) {
    const encodedFunction = web3.eth.abi.encodeFunctionCall({
      name: "approve",
      type: "function",
      inputs: [
        {
          type: 'address',
          name: 'to'
        },
        {
          type: 'uint256',
          name: 'tokenURI'
        }]
    }, [nft_market_place_address, tokenId]);

    const transactionParameters = {
      to: hostContract,
      from: ethereum.selectedAddress,
      data: encodedFunction
    };
    const txt = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters]
    });
    return txt
  }


  const { data, isLoading, error } = useMoralisQuery(
    'Pages',
    (query) => query
      .equalTo("ethAddress", user.get("ethAddress")),
    [],
    {
      live: true
    }
  )

  const { data: linkResult } = useMoralisQuery(
    'Pages',
    query =>
      query
        .equalTo("link", dashboardInput.link),
    [dashboardInput.link],
  )

  const { data: Offers } = useMoralisQuery(
    'PlacedOfferings',
    (query) => query
      .equalTo("offerer", user.get("ethAddress")),
    [],
    {
      live: true
    }
  )

  console.log(Offers)

  useEffect(() => {
    if (dashboardInput.link === linkResult[0]?.attributes.link) {
      if (data[0]?.attributes.link === linkResult[0]?.attributes.link) {
        setAvailable(true)
      } else {
        setAvailable(false)
      }
    } else {
      setAvailable(true)
    }
  }, [linkResult])

  useEffect(() => {
    if (!isLoading && data[0]) {
      let fetchedData = {
        name: data[0]?.attributes.name,
        link: data[0]?.attributes.link,
        about: data[0]?.attributes.about,
        NFTs: data[0]?.attributes.NFTs,
      }

      setDashboardInput(fetchedData)
    }

  }, [data, isLoading])

  const handleChangeInput = (e) => {
    const values = { ...dashboardInput }
    values[e.target.name] = e.target.value
    setDashboardInput(values)
    setSaveLoading(false)
  }

  const saveDashboard = async (e) => {
    e.preventDefault()

    if (!dashboardInput) return

    console.log("saving dashboard", dashboardInput)

    if (!data[0]) {
      const Pages = Moralis.Object.extend('Pages')
      const page = new Pages()

      toast.promise(
        page.save({
          name: dashboardInput.name,
          link: dashboardInput.link,
          about: dashboardInput.about,
          NFTs: dashboardInput.NFTs,
          ethAddress: user.get("ethAddress"),
          avatar: dashboardInput.avatar
        }).then(() => {
          setSaveLoading(true)
        }).catch(error => {
          console.log(error)
        }),
        {
          loading: 'Saving...',
          success: <b>Settings saved!</b>,
          error: <b>Could not save.</b>,
        },
        {
          style: {
            borderRadius: '50px',
            padding: '10px 15px 10px 15px',
          }
        }
      )
    } else {
      const Pages = Moralis.Object.extend('Pages')
      const query = new Moralis.Query(Pages)
      query.equalTo('ethAddress', user.get("ethAddress"))
      const page = await query.first()

      page.set("name", dashboardInput.name)
      page.set("link", dashboardInput.link)
      page.set("about", dashboardInput.about)
      page.set("NFTs", dashboardInput.NFTs)
      page.set("avatar", dashboardInput.avatar)
      toast.promise(
        page.save().then(() => setSaveLoading(true)),
        {
          loading: 'Saving...',
          success: <b>Settings saved!</b>,
          error: <b>Could not save.</b>,
        },
        {
          style: {
            borderRadius: '50px',
            padding: '10px 15px 10px 15px',
          }
        }
      )
    }
  }

  return (
    <div className="max-w-4xl m-auto pb-16">
      <Toaster position="bottom-center" />
      <form className="space-y-8 divide-y divide-gray-200">

        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Display Name
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={dashboardInput.name}
                    onChange={e => handleChangeInput(e)}
                    autoComplete="given-name"
                    className="max-w-lg block w-full shadow-sm focus:ring-black focus:border-black sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Choose a link to your Casavax Profile
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      casavax.com/
                    </span>
                    <input
                      type="text"
                      name="link"
                      id="link"
                      maxLength="25"
                      autoComplete="username"
                      value={dashboardInput.link}
                      onChange={e => handleChangeInput(e)}
                      className="flex-1 block w-full focus:ring-black focus:border-black min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    />
                  </div>
                  {

                  }
                  {
                    !dashboardInput.link == '' ?
                      <div>
                        {
                          available ?
                            (
                              dashboardInput.link === linkResult[0]?.attributes.link ?
                                <p className="text-green-600">Your current</p> :
                                <p className="text-green-600">Link address available!</p>
                            ) :
                            <p className="text-red-600">Link address already taken!</p>
                        }
                      </div> :
                      <p className="text-gray-600">Choose your link!</p>
                  }
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  About
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="max-w-lg shadow-sm block w-full focus:ring-black focus:border-black sm:text-sm border border-gray-300 rounded-md"
                    value={dashboardInput.about}
                    onChange={e => handleChangeInput(e)}
                  />
                  <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Nfts dashboardInput={dashboardInput} setDashboardInput={setDashboardInput} data={data} setSaveLoading={setSaveLoading} userAddress={user.get("ethAddress")} /> */}
        <MoralisNfts offerNFT={offerNFT} dashboardInput={dashboardInput} setDashboardInput={setDashboardInput} data={data} setSaveLoading={setSaveLoading} userAddress={user.get("ethAddress")} />
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              disabled={!data[0] || saveLoading}
            >
              <Link href={`/${data[0]?.attributes.link}`}>
                View Your Page
              </Link>
            </button>
            <button
              onClick={saveDashboard}
              type="submit"
              disabled={saveLoading || !available}
              className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${saveLoading || !available ? "bg-gray-400" : "bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"} `}
            >
              {saveLoading ? "Saved!" : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Dashboard
