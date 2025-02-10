import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useLocationContext } from '../../context/LocationContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LocationsCharts = () => {
    const { locations } = useLocationContext();

    const locationPlaces = locations.reduce((acc: { [key: string]: number }, location) => {
        acc[location.place] = (acc[location.place] || 0) + 1;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(locationPlaces),
        datasets: [
            {
                label: 'Number of Events',
                data: Object.values(locationPlaces),
                backgroundColor: 'rgba(216, 180, 248)',                
                borderRadius: 10,
                barThickness: 100,
            },
        ],
    };

    const options = {
        scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                display: false
              }
            }
          },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <Bar data={data} options={options} />
    );
};

export default LocationsCharts;