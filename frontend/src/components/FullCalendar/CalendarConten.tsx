import { useEffect, useState } from 'react';
import { useEventContext } from "../../context/EventsContext";
import { PartialIEvent } from '../../api/api-interfaces/events-partial-interface'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from './EventModal';
import './calendar.css';

const CalendarContent = () => {
    const { events, fetchEvents, patchEvent, removeEvent } = useEventContext();
    const [selectedEvent, setSelectedEvent] = useState<PartialIEvent | null>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    //Manually formating date from db so plugin isn't necessary
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const calendarEvents = events.map(({ id, title, start, end, description }) => ({
        id: String(id),
        title,
        start: formatDate(start),
        end: formatDate(end),
        description
    }));

    const handleEventClick = (clickInfo: any) => {
        setSelectedEvent({
            id: clickInfo.event.id,
            title: clickInfo.event.title,
            start: formatDate(clickInfo.event.startStr),
            end: formatDate(clickInfo.event.endStr),
            description: clickInfo.event._def.extendedProps.description || ''
        });

        const modal = document.getElementById('eventModal') as HTMLDialogElement;
        if (modal) modal.showModal();
    };

    const handleEventUpdate = async () => {
        if (selectedEvent && selectedEvent.id) {
            try {
                await patchEvent(selectedEvent.id as string, selectedEvent);
                await fetchEvents();
                closeModal();
            } catch (error) {
                console.error("Error updating event:", error);
            }
        }
    };

    const handleEventDelete = async () => {
        if (selectedEvent && selectedEvent.id) {
            try {
                await removeEvent(selectedEvent.id as string);
                await fetchEvents();
                closeModal();
            } catch (error) {
                console.error("Error deleting event:", error);
            }
        }
    };

    const closeModal = () => {
        const modal = document.getElementById('eventModal') as HTMLDialogElement;
        if (modal) modal.close();
    };

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                editable={true}
                selectable={true}
                eventClick={handleEventClick}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridWeek,dayGridMonth'
                }}
            />
            <EventModal
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
                handleEventUpdate={handleEventUpdate}
                handleEventDelete={handleEventDelete}
                closeModal={closeModal}
            />
        </>

    );
};

export default CalendarContent;