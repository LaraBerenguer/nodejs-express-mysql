import users from '../api/users-mockup-data.json';
import locations from '../api/locations-mockup-data.json';
import { IEvent } from '../api/api-interfaces/events-interface';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const EventsForm = () => {

    const [newEvent, setNewEvent] = useState<IEvent>({ id: uuidv4(), title: '', start: '', end: '', allDay: false, location_id: '', user_ids: [''], description: '', category: '', color: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleEventCreation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //create event on calendar o guardarlo en event para pasarlo por context al calendar y consumirlo ahí        
        setNewEvent({ id: uuidv4(), title: '', start: '', end: '', allDay: false, location_id: '', user_ids: [''], description: '', category: '', color: '' });
    }

    return (
        <div className="event-form max-w-md self-center">
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
                    <select
                        className="select select-bordered grow"
                        name="location_id"
                        value={newEvent.location_id}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled hidden>Location</option>
                        {locations.map(location => (
                            <option key={location.id} value={location.id}>
                                {location.location}
                            </option>
                        ))}
                    </select>
                    <select
                        className="select select-bordered grow"
                        name="user_ids"
                        value={newEvent.user_ids}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled hidden>Who's playing?</option>
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

    )
};

export default EventsForm;