import Calendar from "../components/Calendar/Calendar";
import EventsForm from "../components/EventsForm";
//import "../components/Calendar/calendar.css";

const CalendarPage = () => {
    return (
        <div className="maps-page">
            <div className="maps-page-header my-3">
                <p>Schedule your games</p>
            </div>
            <div className="maps-page-content flex gap-5">
                <div className="basis-2/3"><Calendar /></div>
                <div className="basis-1/3"><EventsForm /></div>
            </div>

        </div>
    )
};

export default CalendarPage;