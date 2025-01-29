import EventsForm from "../components/EventsForm";

const CalendarPage = () => {
    return (
        <div className="maps-page">
            <div className="maps-page-header my-3">
                <p>Schedule your games</p>
            </div>
            <div>{/*calendario*/}</div>
            <div><EventsForm /></div>
        </div>
    )
};

export default CalendarPage;