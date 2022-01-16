import Header from './Header'
import { ByMoralis } from "react-moralis"


const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#fff8ea]">
      <Header />

      <main>
        {children}
      </main>

      <footer>
        <div className="border-y border-gray-200 py-8 mb-8 text-center">
          Copyright Casavax.com 2022
        </div>
        <ByMoralis variant="dark" width={180} style={{ marginLeft: "auto", marginRight: "auto" }} />
      </footer>
    </div>
  )
}

export default Layout
