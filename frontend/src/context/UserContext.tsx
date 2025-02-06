import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUser } from '../api/api-interfaces/user-interface';
import { getUsers, createUser, changeUser, deleteUser } from '../services/servicesUsers/user-crud';

interface UserContextProps {
    users: IUser[];
    fetchUsers: () => void;
    addUser: (user: IUser) => void;
    updateUser: (id: string, user: IUser) => void;
    removeUser: (id: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [users, setUsers] = useState<IUser[]>([]);

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const addUser = async (user: IUser) => {
        try {
            const newUser = await createUser(user);
            setUsers((prevUsers) => [...prevUsers, newUser]);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const updateUser = async (id: string, user: IUser) => {
        try {
            const updatedUser = await changeUser({ userData: user, id });
            setUsers((prevUsers) =>
                prevUsers.map((e) => (e.id === id ? updatedUser : e))
            );
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const removeUser = async (id: string) => {
        try {
            await deleteUser(id);
            setUsers((prevUsers) => prevUsers.filter((e) => e.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, fetchUsers, addUser, updateUser, removeUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within an UserProvider');
    }
    return context;
};