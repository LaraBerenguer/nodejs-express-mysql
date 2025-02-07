import EventsChart from "../components/Charts/EventsChart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import LocationsCharts from "../components/Charts/LocationsCharts";

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphicsPage = () => {
    return (
        <>
            <div className="prose">
                <h1 className="py-4">GraphicsPage</h1>
            </div>
            <div className="graphics-page-elements flex flex-col gap-20">
                <div className="graphics-page-bar-chart">
                    <div className="graphics-page-chart-text prose my-10">
                        <h2>Types of tables and its numbers:</h2>
                    </div>
                    <div className="graphics-page-chart max-w-[80%]">
                        <LocationsCharts />
                    </div>
                </div>
                <div className="graphics-page-line-chart">
                    <div className="graphics-page-line-chart-text prose my-10">
                        <h2>Events and days:</h2>
                    </div>
                    <div className="graphics-page-chart max-w-[50%]">
                        <EventsChart />
                    </div>
                </div>
            </div>

        </>
    )
};

export default GraphicsPage;