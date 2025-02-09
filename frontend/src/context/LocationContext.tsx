import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ILocations } from '../api/api-interfaces/locations-interface';
import { getLocations, createLocation } from '../services/servicesLocations/location-crud';

interface LocationsContextProps {
    locations: ILocations[];
    fetchLocations: () => void;
    addLocation: (location: ILocations) => void;
}

const LocationContext = createContext<LocationsContextProps | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [locations, setLocations] = useState<ILocations[]>([]);

    const fetchLocations = async () => {
        try {
            const fetchedLocations = await getLocations();
            setLocations(fetchedLocations);
        } catch (error) {
            console.error('Error fetching lpcations:', error);
        }
    };

    const addLocation = async (location: ILocations) => {
        try {
            const newLocation = await createLocation(location);
            setLocations((prevLocations) => [...prevLocations, newLocation]);
        } catch (error) {
            console.error('Error creating locations:', error);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const value = useMemo(() => ({
        locations,
        fetchLocations,
        addLocation
    }), [locations]);

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocationContext must be used within an LocationProvider');
    }
    return context;
};