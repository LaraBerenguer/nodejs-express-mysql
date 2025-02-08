import { useState } from 'react';
import { ILocations } from '../../api/api-interfaces/locations-interface';
import { useLocationContext } from '../../context/LocationContext';

interface LocationFormProps {
    onLocationCreated: () => void;
}

const LocationForm = ({ onLocationCreated }: LocationFormProps) => {    
    const { fetchLocations, addLocation } = useLocationContext();    
    const [newLocation, setNewLocation] = useState<ILocations>({ name: '', place: '', lng: 0, lat: 0 });

    const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewLocation({ ...newLocation, [name]: name === 'lat' || name === 'lng' ? parseFloat(value) || 0 : value });
    };

    const handleLocationCreation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addLocation(newLocation);
        fetchLocations();
        setNewLocation({ name: '', place: '', lng: 0, lat: 0 });
        onLocationCreated();
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleLocationCreation}>
            <label className="input input-bordered flex items-center gap-2">
                New location name
                <input
                    type="text"
                    className="grow"
                    name="name"
                    value={newLocation.name}
                    onChange={handleLocationInputChange}
                    required
                />
            </label>
            <p className='text-xs text-gray-500'>Don't know your coordinates? Check them <a className='underline' href='https://www.latlong.net/' target="_blank">here</a>.</p>
            <label className="input input-bordered flex items-center gap-2">
                Latitude
                <input
                    type="text"
                    className="grow"
                    name="lat"
                    value={newLocation.lat}
                    onChange={handleLocationInputChange}
                    required
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Longitude
                <input
                    type="text"
                    className="grow"
                    name="lng"
                    value={newLocation.lng}
                    onChange={handleLocationInputChange}
                    required
                />
            </label>
            <select
                className="select select-bordered grow"
                name="place"
                value={newLocation.place}
                onChange={handleLocationInputChange}
                required
            >
                <option value="" disabled hidden>Is it a Shop?</option>
                <option value="Shop">Shop</option>
                <option value="Private Table">Private Table</option>
            </select>
            <button className="btn btn-sm" type="submit">Create Location</button>
        </form>
    );
};

export default LocationForm;