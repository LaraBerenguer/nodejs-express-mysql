import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(/bg-img.jpg)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-lg">
                    <h1 className="mb-5 text-6xl font-bold">Find your games</h1>
                    <h2 className="mb-5 text-4xl font-bold">Start your adventure</h2>                    
                    <Link to="/calendar" className="btn btn-secondary my-2">Check the events</Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;