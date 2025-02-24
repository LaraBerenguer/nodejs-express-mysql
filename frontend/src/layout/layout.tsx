import { Outlet } from "react-router-dom";
import '../index.css';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Layout = () => {
    return (
        <div>
            <div className="Navbar">
                <Navbar />
            </div>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;