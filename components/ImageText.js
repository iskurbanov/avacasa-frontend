

const ImageText = () => {
  return (
    <div>
      <section className="py-12 bg-gradient-to-b from-white to-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:items-center gap-y-8 md:grid-cols-2 md:gap-x-16">
            <div className="text-center md:text-left lg:pr-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                Coming Soon!
              </h2>
              <p className="mt-4 text-lg text-gray-700 sm:mt-8 font-pj">
                Mint your own personal NFT's right from your dashboard! <br /><br />Let your loyal fan base take part in your growth and give them the ability to trade access to your exclusive content. You get 10% from each transaction after the first sale!
              </p>
            </div>

            <div>
              <img className="w-full max-w-md mx-auto" src="https://cdn.rareblocks.xyz/collection/clarity/images/features/1/illustration.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};

export default ImageText;
