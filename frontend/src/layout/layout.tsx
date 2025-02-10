import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import '../index.css';
import Footer from "../components/Footer/Footer";

const Layout = () => {
    return(
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