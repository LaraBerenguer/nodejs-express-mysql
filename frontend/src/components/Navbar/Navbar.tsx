import { Link } from "react-router-dom";
import ThemeController from "./ThemeController";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link to="/maps">Maps</Link></li>
                        <li><Link to="/calendar">Calendar</Link></li>
                        <li><Link to="/graphics">Graphics</Link></li>
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl" to="/">Home</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 flex gap-4">
                    <li><Link to="/maps">Maps</Link></li>
                    <li><Link to="/calendar">Calendar</Link></li>
                    <li><Link to="/graphics">Graphics</Link></li>
                </ul>
            </div>
            <div className="navbar-end flex gap-6">
                <ThemeController />
                <Link className="btn" to="/users">Users</Link>
            </div>
        </div>
    )
};

export default Navbar;