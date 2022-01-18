import Header from './Header'
import { ByMoralis } from "react-moralis"


const Layout = ({ children, type }) => {
  return (
    <div className="flex flex-col justify-between box-content overflow-x-hidden">
      {
        type !== 'no-wrap' ?
          (
            <>
              < Header />

              <main className="">
                {children}
              </main>

              <footer>
                <div className="border-y border-gray-200 py-8 mb-8 text-center">
                  Copyright Casavax.com 2022
                </div>
                <ByMoralis variant="dark" width={180} style={{ marginLeft: "auto", marginRight: "auto" }} />
              </footer>
            </>
          )
          :
          <div>
            <main>
              {children}
            </main>
          </div>
      }
    </div>
  )
}

export default Layout
