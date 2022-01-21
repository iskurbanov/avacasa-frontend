import Layout from "../../components/Layout"


const team = () => {
  return (
    <Layout>
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-36">
          <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-16 xl:gap-x-36">
            <div className="md:order-2">
              <img className="w-full max-w-sm mx-auto" src="https://cdn.rareblocks.xyz/collection/clarity/images/team/3/members.png" alt="" />
            </div>

            <div className="text-center md:order-1 md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                Serial Enterpreneurs
              </h2>
              <p className="text-lg font-medium text-gray-900 mt-7 font-pj">
                Join our team as we work to build a strong community on the Avalanche Blockchain Ecosystem!
              </p>
              {/* <p className="mt-5 text-base font-normal text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet pellentesque aliquam enim.
              </p> */}
            </div>
          </div>
        </div>
        <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Founding Team
            </h2>
          </div>

          <div className="grid max-w-6xl grid-cols-1 px-20 mx-auto mt-12 text-center sm:px-0 sm:grid-cols-2 md:mt-20 gap-x-8 gap-y-12 lg:gap-x-16 xl:gap-x-20 items-center justify-center">
            <div>
              <img className="object-cover w-48 h-48 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter" src="/avatar2.png" alt="" />
                <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">
                  Olena Severyn
                </p>
                <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                  Co-founder, Marketing Strategy
                </p>
            </div>

            <div>
              <img className="object-cover w-48 h-48 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter" src="/avatar1.png" alt="" />
                <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">
                  Iskandar Kurbanov
                </p>
                <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                  Co-founder, Software Developer
                </p>
                <div className="">Twitter: @iskurbanov</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default team
