import MapInstance from "../components/Map/Map";

const MapsPage = () => {
    return (
        <div className="maps-page">
            <div className="maps-page-header prose my-3">
                <h1 className="py-4">Find where the games happen</h1>
            </div>
            <div><MapInstance /></div>
        </div>
    )
};

export default MapsPage;