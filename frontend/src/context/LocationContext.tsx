import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { ILocations } from '../api/api-interfaces/locations-interface';
import { getLocations, createLocation } from '../services/servicesLocations/location-crud';

interface LocationsContextProps {
    locations: ILocations[];
    fetchLocations: () => void;
    addLocation: (location: ILocations) => void;
}

const initialState = {
    locations: [] as ILocations[],
};

const reducer = (state: typeof initialState, action: any) => {
    switch (action.type) {
        case "SET_LOCATIONS":
            return { ...state, locations: action.payload };
        case "ADD_LOCATIONS":
            return { ...state, locations: [...state.locations, action.payload] };
        default:
            return state;
    };
};

const LocationContext = createContext<LocationsContextProps | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    //const [locations, setLocations] = useState<ILocations[]>([]);
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchLocations = async () => {
        try {
            const fetchedLocations = await getLocations();
            dispatch({type: "SET_LOCATIONS", payload: fetchedLocations});
        } catch (error) {
            console.error('Error fetching lpcations:', error);
        }
    };

    const addLocation = async (location: ILocations) => {
        try {
            const newLocation = await createLocation(location);
            dispatch({type: "ADD_LOCATIONS", payload: newLocation});
        } catch (error) {
            console.error('Error creating locations:', error);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const value = useMemo(() => ({
        locations: state.locations,
        fetchLocations,
        addLocation
    }), [state.locations]);

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