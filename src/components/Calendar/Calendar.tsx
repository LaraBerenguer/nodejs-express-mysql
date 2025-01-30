import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid, CalendarApp } from "@schedule-x/calendar";
//import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import "@schedule-x/theme-default/dist/calendar.css";
import events from "../../api/events-mockup-data.json";
//import "./calendar.css";
//import { useState } from "react";

const Calendar = () => {
    //const eventsService = useState(() => createEventsServicePlugin())[0];
    const eventModal = createEventModalPlugin();
    const calendarEvent = events.map(event => ({
        id: event.id,
        title: event.title,
        start: new Date(event.start).toISOString().slice(0, 16).replace('T', ' '),
        end: new Date(event.end).toISOString().slice(0, 16).replace('T', ' '),
        description: event.description
    }))

    const calendar: CalendarApp = useCalendarApp({
        views: [
            createViewWeek(),
            createViewMonthGrid()
        ],
        events: calendarEvent,
        plugins: [/*ventsService*/
            eventModal,
            createDragAndDropPlugin(),

        ],
        selectedDate: "2024-02-01"
    })

    eventModal.close();

    return (
        <ScheduleXCalendar calendarApp={calendar} />
    )
};

export default Calendar;