import events from '../api/events-mockup-data.json';
import { IEvent } from '../api/api-interfaces/events-interface';

//get
export const getEvents = () => {
    return events;
};

//post
export const createEvent = (eventData: IEvent) => {  
    events.push(eventData);
};

//put
export const changeEvent = ({eventData, newEventData}: {eventData: IEvent, newEventData: IEvent}) => {
    const input = eventData.id;
    const foundEvent = events.find(event => event.id === input);
    const eventIndex = events.findIndex(event => event.id === input);

    if (!foundEvent) {
        return "Event not found. Try again."
    };

    const updatedEvent: IEvent = {...foundEvent, ...newEventData};

    events[eventIndex] = updatedEvent;
    return "event updated";
};

//delete
export const deleteUser = (id: string) => {
    const inputEvent = id;
    const eventIndex = events.findIndex(event => event.id === inputEvent);

    if (eventIndex !== -1) {
        events.splice(eventIndex, 1)
    } else {
        return "event not found. Try again."
    };
};