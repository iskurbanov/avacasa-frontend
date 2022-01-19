import Header from './Header'
import { ByMoralis } from "react-moralis"
import Footer from './Footer'


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

              <Footer />
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
