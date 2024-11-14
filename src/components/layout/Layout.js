import { Outlet } from "react-router-dom";
import Navbar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import "./Layout.css"; 

export default function Layout(props) {
    const { isAuthenticated, userData, setIsAuthenticated } = props;
    return (
        <div className="layout-container">
            <Navbar 
                isAuthenticated={isAuthenticated}
                userData={userData} 
                setIsAuthenticated={setIsAuthenticated} 
            />
            <div className="content-area">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
