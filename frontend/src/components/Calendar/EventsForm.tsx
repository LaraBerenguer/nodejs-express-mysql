import { useEffect, useState } from 'react';
import { useEventContext } from '../../context/EventsContext';
import { useLocationContext } from '../../context/LocationContext';
import { useUserContext } from '../../context/UserContext';
import { ILocations } from '../../api/api-interfaces/locations-interface';
import LocationForm from '../Calendar/LocationsForm';

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
    const { fetchEvents, addEvent } = useEventContext();
    const { locations, fetchLocations } = useLocationContext();
    const { users, fetchUsers } = useUserContext();
    const [newEvent, setNewEvent] = useState<EventForm>({ title: '', start: '', end: '', allDay: false, location_id: '', user_ids: [''], description: '', category: '', color: '' });

    useEffect(() => {
        fetchUsers();
        fetchLocations();        
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleEventCreation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addEvent(newEvent)
        fetchEvents();
        setNewEvent({ title: '', start: '', end: '', allDay: false, location_id: '', user_ids: [''], description: '', category: '', color: '' });
    };

    return (
        <div className='event-forms flex flex-col justify-start gap-2'>
            <div className="event-form max-w-md">
                <div className='my-6 prose'>
                    <div className="collapse bg-base-200">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">Add your event to the calendar</div>
                        <div className="collapse-content">
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
                                {/*This will go into anothe db table, event_users */}
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
                </div>
            </div>
            <div className="event-form-addLocation max-w-md">
                <div className='my-6 prose'>
                    <div className="collapse bg-base-200">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">Need to add a new location?</div>
                        <div className="collapse-content">
                            <LocationForm onLocationCreated={fetchLocations} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default EventsForm;