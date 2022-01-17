import Link from "next/link"
import { useEffect, useState } from "react"
import { useMoralis, useMoralisQuery } from "react-moralis"
import toast, { Toaster } from 'react-hot-toast';
import { Avatar } from "./Avatar"
import Nfts from "./Nfts"

const Dashboard = () => {
  const { user, Moralis } = useMoralis()
  const [saveLoading, setSaveLoading] = useState(false)
  const [selectNft, setSelectNft] = useState([])

  const username = user.get('username')


  const { data, isLoading, error } = useMoralisQuery(
    'Pages',
    (query) => query
      .equalTo("ethAddress", user.get("ethAddress")),
    [],
    {
      live: true
    }
  )

  const [dashboardInput, setDashboardInput] = useState(
    {
      link: '',
      about: '',
      NFTs: [],
      avatar: `https://avatars.dicebear.com/api/identicon/${username}.svg`
    }
  )

  useEffect(() => {
    if (!isLoading && data[0]) {
      let fetchedData = {
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
        <Nfts dashboardInput={dashboardInput} setDashboardInput={setDashboardInput} data={data} setSaveLoading={setSaveLoading} />
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
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    />
                  </div>
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
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    value={dashboardInput.about}
                    onChange={e => handleChangeInput(e)}
                  />
                  <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
                </div>
              </div>

              {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    <div className="relative h-16 w-16">
                      <Avatar />
                    </div>
                    <button
                      type="button"
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Links</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Add your favorite articles, websites, projects you invest in, or anything links to anything else!</p>
            </div>
            <div className="flex">
              <div className="border border-gray-300 bg-white rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 w-1/3 mr-6">
                <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Trading strategy..."
                />
              </div>
              <div className="border border-gray-300 bg-white rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 w-1/3">
                <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="https://tradingview.com"
                />
              </div>
            </div>
          </div> */}
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={!data[0]}
            >
              <Link href={`/${data[0]?.attributes.link}`}>
                View Your Page
              </Link>
            </button>
            <button
              onClick={saveDashboard}
              type="submit"
              disabled={saveLoading}
              className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${saveLoading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"} `}
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
