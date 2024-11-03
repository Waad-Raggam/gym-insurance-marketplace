import { Outlet } from "react-router-dom";
import Navbar from "../navbar/NavBar";
import Footer from "../footer/Footer";

export default function Layout() {
    return(
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}
