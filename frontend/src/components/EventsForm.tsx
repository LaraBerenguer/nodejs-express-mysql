import { useEffect, useState } from 'react';
import { createEvent, getEvents } from '../services/servicesEvent/event-crud';
import { IEvent } from '../api/api-interfaces/events-interface';
import { ILocations } from '../api/api-interfaces/locations-interface';
import { IUser } from '../api/api-interfaces/user-interface';
import { getUsers } from '../services/servicesUsers/user-crud';
import { getLocations } from '../services/servicesLocations/location-crud';
import LocationForm from './LocationsForm';

interface EventForm {
    title: string,
    start: string,
    end: string,
    allDay: boolean,
    location_id: string,
    user_ids: string[],
    description: string,
    category: string,
    color: string;
}

const EventsForm = () => {

    const [newEvent, setNewEvent] = useState<EventForm>({ title: '', start: '', end: '', allDay: false, location_id: '', user_ids: [''], description: '', category: '', color: '' });
    const [locations, setLocations] = useState<ILocations[]>([]);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        fetchUsers();
        fetchLocations();
        fetchEvents();        
    }, []);

    const fetchUsers = async () => {
        try {
            const users = await getUsers();
            console.log("fetched users: ", users);
            setUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchEvents = async () => {
        try {
            const fetchedEvents = await getEvents();
            console.log("fetched locations form: ", events);
            setEvents(fetchedEvents);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const fetchLocations = async () => {
        try {
            const locations = await getLocations();
            console.log("fetched locations: ", locations);
            setLocations(locations);            
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleEventCreation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createEvent(newEvent);
        setNewEvent({ title: '', start: '', end: '', allDay: false, location_id: '', user_ids: [''], description: '', category: '', color: '' });
    };

    return (
        <div className='event-forms flex justify-around gap-10'>
            <div className="event-form max-w-md self-center">
            <div className='my-6'>
                    <h2>Add your event to the calendar</h2>
                </div>
                <div className="event-form-addEvent">
                    <form className="flex flex-col gap-4" onSubmit={handleEventCreation}>
                        <label className="input input-bordered flex items-center gap-2">
                            Title
                            <input
                                type="text"
                                className="grow"
                                name="title"
                                value={newEvent.title}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Description
                            <input
                                type="text"
                                className="grow"
                                name="description"
                                value={newEvent.description}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Start date
                            <input
                                type="datetime-local"
                                className="grow"
                                name="start"
                                value={newEvent.start}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            End date
                            <input
                                type="datetime-local"
                                className="grow"
                                name="end"
                                value={newEvent.end}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center justify-between gap-2">
                            Mark this if event lasts all day:
                            <input
                                type="checkbox"
                                className="checkbox"
                                name="allDay"
                                checked={newEvent.allDay}
                                onChange={(e) => setNewEvent({ ...newEvent, allDay: e.target.checked })}
                            />
                        </label>
                        <select
                            className="select select-bordered grow"
                            name="location_id"
                            value={newEvent.location_id}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled hidden>Location</option>
                            {locations.map((location: ILocations) => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                        <p>Who's playing?</p>
                        <select
                            className="select select-bordered grow"
                            name="user_ids"
                            value={newEvent.user_ids}
                            onChange={(e) => {
                                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                                setNewEvent({ ...newEvent, user_ids: selectedOptions });
                            }}
                            multiple
                            required
                        >
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.nickname}
                                </option>
                            ))}
                        </select>
                        <button className="btn btn-sm" type="submit">Create Event</button>
                    </form>
                </div>
            </div>
            <div className="event-form-addLocation">
                <div className='my-6'>
                    <h2>Need to add a new location?</h2>
                </div>
                <LocationForm onLocationCreated={fetchLocations} />
            </div>
        </div>

    )
};

export default EventsForm;