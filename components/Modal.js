/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'

export default function Modal({ open, setOpen, modalData }) {

  console.log(modalData)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gradient-to-bl from-indigo-300 via-red-300 to-yellow-300 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-3xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div className="sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="min-w-64 max-w-80 md:w-80 h-full w-full">
                  <img className="rounded-2xl object-cover md:w-80 w-full"
                    src={modalData.image}
                    onError={(e) => {
                      // e.target.style.display = 'none'
                      e.currentTarget.onerror = null
                      e.currentTarget.src = "https://cdn.shopify.com/s/files/1/2618/8176/files/no-image-found.png?v=3919685981083119590"
                    }}
                  />
                </div>
                <div className="pl-2 sm:w-1/2">
                  <p className="font-semibold text-2xl text-left">{modalData.metadata ? modalData.metadata.name : modalData.name}</p>
                  <p className="text-md text-left w-full pt-2">{!modalData.price || modalData.price === "0" ? "Not for sale" : modalData.price + " " + "AVAX"}</p>
                  {
                    modalData.metadata?.attributes &&
                    <div className="pt-3">
                      <h3 className="font-bold text-xl pb-2">Attributes</h3>
                      <div className="flex flex-wrap">
                        {
                          modalData.metadata.attributes?.map(item => (
                            <div key={item.trait_type} className="bg-gray-50 rounded-2xl p-2 flex flex-col mr-2 mb-2">
                              <span className="text-gray-500 uppercase font-semibold text-xs">{item.trait_type}</span>
                              <span className="font-semibold text-sm">{item.value}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  }
                  {
                    modalData.price && modalData.price > 0 &&
                    <button
                        onClick={() => window.open(`https://nftrade.com/assets/avalanche/${modalData.token_address}/${modalData.token_id}`, "_blank")}
                      className="w-64 mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Buy
                    </button>
                  }
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
