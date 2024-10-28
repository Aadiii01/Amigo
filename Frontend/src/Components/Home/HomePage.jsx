
import SideBar from "./SideBar"
import HeaderMain from "./HeaderMain"
import Footer from "../Footer"
import { Outlet } from "react-router-dom";



export function HomePage() {

  return (
    <>
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

      <div className="hidden border-r md:block bg-white">
        <SideBar/>
      </div>

      <div className="flex flex-col">
        <HeaderMain/>
        <Outlet/>
      </div>

    </div>
    <Footer bkcolor={"bg-white"} mainT={"text-black"} hovera={"hover:text-[#111]"}/>
    </>
  )
}
