import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import '../index.css';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import LoadingDots from "../components/Loading/Loading";

const Layout = () => {
    return (
        <div>
            <div className="Navbar">
                <Navbar />
            </div>
            <main>
                <Suspense fallback={<LoadingDots />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;