import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../index.css';

const Layout = () => {
    return(
        <div>            
            <Navbar />
            <main>
                <Outlet />
            </main>            
        </div>
    );
};

export default Layout;