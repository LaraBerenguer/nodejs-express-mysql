import { ILocations } from '../../api/api-interfaces/locations-interface';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
console.log("Api en uso: ", API_URL);

//get
export const getLocations = async () => {
    try {
        const response = await fetch(`${API_URL}/api/locations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        console.log("Respuesta HTTP:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);
        return data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

//post
export const createLocation = async (locationData: ILocations) => {
    try {
        const response = await fetch(`${API_URL}/api/locations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(locationData)
        });
        return response.json();
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};