import { Outlet } from "react-router-dom";
import Navbar from "../navbar/NavBar";
import Footer from "../footer/Footer";

export default function Layout(props) {
    const { isAuthenticated, userData} = props;
    return(
        <div>
            <Navbar
            isAuthenticated = {isAuthenticated}
            userData = {userData}
            />
            <Outlet/>
            <Footer/>
        </div>
    )
}
