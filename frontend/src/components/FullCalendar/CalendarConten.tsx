import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEventContext } from "../../context/EventsContext";

const CalendarContent = () => {
    const { events, fetchEvents } = useEventContext();

    useEffect(() => {
        fetchEvents();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:00`;
    };

    const calendarEvents = events.map(({ id, title, start, end, description }) => ({
        id: String(id),
        title,
        start: formatDate(start),
        end: formatDate(end),
        description
    }));

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            editable={true}
            selectable={true}
            headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'dayGridWeek,dayGridMonth'
            }}
        />
    );
};

export default CalendarContent;