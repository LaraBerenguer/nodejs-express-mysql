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
                <div>
                    <div><Calendar /></div>
                </div>
                <div><EventsForm /></div>
            </div>
        </div>
    )
};

export default CalendarPage;