import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
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

type Action =
    | { type: 'SET_EVENTS'; payload: IEvent[] }
    | { type: 'ADD_EVENT'; payload: IEvent }
    | { type: 'UPDATE_EVENT'; payload: IEvent }
    | { type: 'PATCH_EVENT'; payload: IEvent }
    | { type: 'REMOVE_EVENT'; payload: string };


const initialState = {
    events: [] as IEvent[],
};

const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
        case "SET_EVENTS":
            return { ...state, events: action.payload };
        case "ADD_EVENT":
            return { ...state, events: [...state.events, action.payload] };
        case "UPDATE_EVENT":
            return { ...state, events: state.events.map((event) => (event.id === action.payload.id ? action.payload : event)) };
        case "PATCH_EVENT":
            return { ...state, events: state.events.map((event) => (event.id === action.payload.id ? action.payload : event)) };
        case "REMOVE_EVENT":
            return { ...state, events: state.events.filter((e) => e.id !== action.payload) };
        default:
            return state;
    };
};

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchEvents = async () => {
        try {
            const fetchedEvents = await getEvents();
            dispatch({ type: "SET_EVENTS", payload: fetchedEvents });
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const addEvent = async (event: IEvent) => {
        try {
            const newEvent = await createEvent(event);
            dispatch({ type: "ADD_EVENT", payload: newEvent });
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const updateEvent = async (id: string, event: IEvent) => {
        try {
            const updatedEvent = await changeEvent({ eventData: event, id });
            dispatch({ type: "UPDATE_EVENT", payload: updatedEvent });
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const patchEvent = async (id: string, event: PartialIEvent) => {
        try {
            const patchedEvent = await patchEventService({ eventData: event, id });
            dispatch({ type: "PATCH_EVENT", payload: patchedEvent });
        } catch (error) {
            console.error('Error patching event:', error);
        }
    };

    const removeEvent = async (id: string) => {
        try {
            await deleteEvent(id);
            dispatch({ type: "REMOVE_EVENT", payload: id });
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const value = useMemo(() => ({
        events: state.events,
        fetchEvents,
        addEvent,
        updateEvent,
        patchEvent,
        removeEvent
    }), [state.events]);

    return (
        <EventContext.Provider value={value}>
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