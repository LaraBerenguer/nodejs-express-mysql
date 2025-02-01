import Map from "../components/Map/Map";

const MapsPage = () => {
    return (
        <div className="maps-page">
            <div className="maps-page-header my-3">
                <p>Find where the games happen</p>
            </div>
            <div><Map /></div>
        </div>
    )
};

export default MapsPage;