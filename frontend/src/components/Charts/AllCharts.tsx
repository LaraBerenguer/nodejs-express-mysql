import EventsChart from "../Charts/EventsChart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import LocationsCharts from "../Charts/LocationsCharts";

ChartJS.register(ArcElement, Tooltip, Legend);

const AllCharts = () => {
    return (
        <div className="graphics-page">
            <div className="prose">
                <h1 className="py-4">Check the charts</h1>
            </div>
            <div className="graphics-page-elements flex flex-col md:flex-row justify-around gap-5">
                <div className="graphics-page-bar-chart flex flex-col justify-between">
                    <div className="graphics-page-chart-text prose my-10">
                        <h2>Types of tables and its numbers:</h2>
                    </div>
                    <div className="graphics-page-chart w-full">
                        <LocationsCharts />
                    </div>
                </div>
                <div className="graphics-page-line-chart">
                    <div className="graphics-page-line-chart-text prose my-10">
                        <h2>Events and days:</h2>
                    </div>
                    <div className="graphics-page-chart w-full">
                        <EventsChart />
                    </div>
                </div>
            </div>            
        </div>
    )
};

export default AllCharts;