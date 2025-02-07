//import Calendar from "../components/Calendar/Calendar";
import EventsForm from "../components/Calendar/EventsForm";
import CalendarContent from "../components/Calendar/CalendarConten";

const CalendarPage = () => {
    return (
        <div className="maps-page">
            <div className="maps-page-header my-3 prose">
                <h1 className="py-4">Schedule your games</h1>
            </div>
            <div className="maps-page-content flex flex-col gap-10">
                <div><CalendarContent /></div>
                <div><EventsForm /></div>
            </div>
        </div>
    )
};

export default CalendarPage;