import { IUser } from '../../api/api-interfaces/user-interface';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

//get
export const getUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/api/users`, {
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
        console.error('Error fetching users:', error);
        throw error;
    }
};

//post
export const createUser = async (userData: IUser) => {
    try {
        const response = await fetch(`${API_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

//put
export const changeUser = async ({userData, id}: {userData: IUser, id: string}) => {
    try {
        const response = await fetch(`${API_URL}/api/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    } catch (error) {
        console.error('Error modifying users:', error);
        throw error;
    }
};

//patch
export const modifyUser = async ({userData, id}: {userData: IUser, id: string}) => {
    try {
        const response = await fetch(`${API_URL}/api/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    } catch (error) {
        console.error('Error modifying users:', error);
        throw error;
    }
};

//delete
export const deleteUser = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/api/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.json();
    } catch (error) {
        console.error('Error deleting users:', error);
        throw error;
    }
};