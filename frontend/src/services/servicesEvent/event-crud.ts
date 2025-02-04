import { IEvent } from '../../api/api-interfaces/events-interface';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

//get
export const getEvents = async () => {
    try {
        const response = await fetch(`${API_URL}/api/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

//post
export const createEvent = async (eventData: IEvent) => {  
    try {
        const response = await fetch(`${API_URL}/api/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });
        return response.json();
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

//put
export const changeEvent = async ({eventData, id}: {eventData: IEvent, id: string}) => {
    try {
        const response = await fetch(`${API_URL}/api/events/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });
        return response.json();
    } catch (error) {
        console.error('Error modifying events:', error);
        throw error;
    }
};

//delete
export const deleteEvent = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/api/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Error deleting events:')
        }

        if (response.status === 204) {return null;}

        return await response.json();
        
    } catch (error) {
        console.error('Error deleting events:', error);
        throw error;
    }
};