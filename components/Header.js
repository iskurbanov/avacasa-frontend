/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useMoralis } from "react-moralis"
import Link from 'next/link'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { user, isAuthenticated, isAuthenticating, logout, authenticate } = useMoralis()

  return (
    <Disclosure as="nav" className="bg-white shadow mt-8 mx-8 rounded-full sticky top-8 left-0 z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/">
                  <div className="grid grid-cols-2 items-center font-bold relative cursor-pointer">
                    <Image
                      src="/avax-logo.png"
                      height={36}
                      width={36}
                      objectFit='contain'
                      className="rounded-full"
                    />
                    Casavax
                  </div>
                </Link>
                {isAuthenticated &&
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <a
                      href="#"
                      className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Dashboard
                    </a>
                  </div>
                }
              </div>
              <div className="flex justify-end items-center w-1/2">
                {/* Login Button */}
                <Menu as="div" className="ml-3 relative">
                  {
                    !isAuthenticated ?
                      <button
                        onClick={authenticate}
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {
                          !isAuthenticating ?
                            <span className='mr-3'>Login</span>
                            :
                            <span className='mr-3'>Authenticating...</span>
                        }
                        <Image src="/metamask.png" height={20} width={20} />
                      </button>
                      :
                      <button
                        onClick={logout}
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="">Logout</span>
                      </button>
                  }
                </Menu>
                {isAuthenticated &&
                  <div className="flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                }
              </div>
            </div>
          </div>
          {isAuthenticated &&
            <Disclosure.Panel className="sm:hidden">
              <div className="pt-12 pb-3 space-y-1 absolute top-8 left-0 w-full bg-white -z-10 rounded-b-3xl shadow transition-all">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Dashboard
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Team
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          }
        </>
      )}
    </Disclosure>
  )
}
