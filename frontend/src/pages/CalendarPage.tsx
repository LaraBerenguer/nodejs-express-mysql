import EventsForm from "../components/Calendar/EventsForm";
import CalendarContent from "../components/Calendar/CalendarConten";

const CalendarPage = () => {
    return (
        <div className="maps-page">
            <div className="maps-page-header my-3 prose">
                <h1 className="py-4">Schedule your games</h1>
            </div>
            <div className="maps-page-content flex flex-col xl:flex-row gap-20">
                <div className="basis-2/3"><CalendarContent /></div>
                <div className="basis-1/3"><EventsForm /></div>
            </div>
        </div>
    )
};

export default CalendarPage;