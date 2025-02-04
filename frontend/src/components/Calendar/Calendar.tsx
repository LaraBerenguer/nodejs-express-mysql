import { useEffect, useState } from "react";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid, CalendarApp } from "@schedule-x/calendar";
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import "@schedule-x/theme-default/dist/calendar.css";
import "./calendar.css";
import { getEvents } from "../../services/servicesEvent/event-crud";
import { IEvent } from "../../api/api-interfaces/events-interface";

const Calendar = () => {

    const [events, setEvents] = useState<IEvent[]>([]);

    const fetchEvents = async () => {
        try {
            const events = await getEvents();
            console.log("Fetched events:", events);
            setEvents(events);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const eventsService = useState(() => createEventsServicePlugin())[0];
    const eventModal = createEventModalPlugin();

    const calendarEvents = events.map(({ id, title, start, end, description }) => ({
        id: Number(id),
        title,
        start: new Date(start).toISOString().slice(0, 16).replace("T", " "),
        end: new Date(end).toISOString().slice(0, 16).replace("T", " "),
        description
    }));

    /*const calendarEvents = [{
        id: "4",
        title: "Partida de D&D",
        start: "2025-02-01 18:00",
        end: "2025-02-01 21:00",
        description: "Sesión semanal"
    },
    {
        id: "5",
        title: "Gaming",
        start: "2025-02-02 18:00",
        end: "2025-02-02 21:00",
        description: "BG3"
    }];*/

    //const mapCalendar = calendarEvents.map(event => event);

    /*const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const calendarEvents = events.map(event => {
        const start = String(formatDate(event.start));
        const end = String(formatDate(event.end));
        console.log(`Event Start: ${start}, Event End: ${end}`);
        return {
            id: String(event.id),
            title: String(event.title),
            start,
            end,
            description: String(event.description)
        };
    });*/

    console.log("Calendar events:", calendarEvents);

    const calendar: CalendarApp = useCalendarApp({
        views: [
            createViewWeek(),
            createViewMonthGrid()
        ],
        events: calendarEvents,
        plugins: [
            eventsService,
            eventModal,
            createDragAndDropPlugin()
        ],
        selectedDate: "2025-02-01"
    })

    eventModal.close();

    return (
        <ScheduleXCalendar calendarApp={calendar} />
    )
};

export default Calendar;