import Header from './Header'
import { ByMoralis } from "react-moralis"


const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#fff8ea]">
      <Header />

      <main>
        {children}
      </main>

      <ByMoralis variant="dark" width={180} style={{ marginLeft: "auto", marginRight: "auto" }} />
    </div>
  )
}

export default Layout
