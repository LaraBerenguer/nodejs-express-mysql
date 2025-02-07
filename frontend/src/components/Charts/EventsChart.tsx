import { Doughnut } from 'react-chartjs-2';
import { useEventContext } from '../../context/EventsContext';

const EventsChart = () => {
    const { events } = useEventContext();

    const eventDates = events.reduce((acc: { [key: string]: number }, event) => {
        const date = new Date(event.start).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(eventDates),
        datasets: [
            {
                label: 'Number of Events',
                data: Object.values(eventDates),
                backgroundColor: [
                    "rgb(160, 132, 232)",  // Intense lavender
                    "rgb(191, 162, 219)",  // Soft lilac                    
                    "rgb(196, 153, 243)",  // Light mauve                    
                    "rgb(216, 180, 248)",  // Lavender pink
                    "rgb(142, 117, 255)",  // Pastel purple
                ],                
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        maintainAspectRadio: false
    };

    return (
        <Doughnut data={data} options={options} />
    );
};

export default EventsChart;