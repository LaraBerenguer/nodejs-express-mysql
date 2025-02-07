import React, { createContext, useContext, useState, useEffect } from 'react';
import { IEvent } from '../api/api-interfaces/events-interface';
import { getEvents, createEvent, changeEvent, deleteEvent } from '../services/servicesEvent/event-crud';
import { patchEvent as patchEventService } from '../services/servicesEvent/event-crud';
import { PartialIEvent } from '../api/api-interfaces/events-partial-interface';

interface EventContextProps {
    events: IEvent[];
    fetchEvents: () => void;
    addEvent: (event: IEvent) => void;
    updateEvent: (id: string, event: IEvent) => void;
    patchEvent: (id: string, event: PartialIEvent) => void;
    removeEvent: (id: string) => void;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [events, setEvents] = useState<IEvent[]>([]);

    const fetchEvents = async () => {
        try {
            const fetchedEvents = await getEvents();
            setEvents(fetchedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const addEvent = async (event: IEvent) => {
        try {
            const newEvent = await createEvent(event);
            setEvents((prevEvents) => [...prevEvents, newEvent]);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const updateEvent = async (id: string, event: IEvent) => {
        try {
            const updatedEvent = await changeEvent({ eventData: event, id });
            setEvents((prevEvents) =>
                prevEvents.map((e) => (e.id === id ? updatedEvent : e))
            );
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const patchEvent = async (id: string, event: PartialIEvent) => {
        try {
            const patchedEvent = await patchEventService({ eventData: event, id });
            setEvents((prevEvents) =>
                prevEvents.map((e) => (e.id === id ? patchedEvent : e))
            );
        } catch (error) {
            console.error('Error patching event:', error);
        }
    };

    const removeEvent = async (id: string) => {
        try {
            await deleteEvent(id);
            setEvents((prevEvents) => prevEvents.filter((e) => e.id !== id));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <EventContext.Provider value={{ events, fetchEvents, addEvent, updateEvent, patchEvent, removeEvent }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEventContext = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEventContext must be used within an EventProvider');
    }
    return context;
};