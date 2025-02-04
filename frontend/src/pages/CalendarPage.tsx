//import Calendar from "../components/Calendar/Calendar";
import EventsForm from "../components/EventsForm";
import CalendarContent from "../components/FullCalendar/CalendarConten";

const CalendarPage = () => {
    return (
        <div className="maps-page">
            <div className="maps-page-header my-3">
                <p>Schedule your games</p>
            </div>
            <div className="maps-page-content flex flex-col gap-10">
                <div><CalendarContent /></div>
                <div><EventsForm /></div>
            </div>
        </div>
    )
};

export default CalendarPage;