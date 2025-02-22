import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { IUser } from '../api/api-interfaces/user-interface';
import { getUsers, createUser, changeUser, deleteUser } from '../services/servicesUsers/user-crud';

interface UserContextProps {
    users: IUser[];
    fetchUsers: () => void;
    addUser: (user: IUser) => void;
    updateUser: (id: string, user: IUser) => void;
    removeUser: (id: string) => void;
}

const initialState = {
    users: [] as IUser[],
};

const reducer = (state: typeof initialState, action: any) => {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, users: action.payload };
        case "ADD_USER":
            return { ...state, users: [...state.users, action.payload] };
        case "UPDATE_USER":
            return { ...state, users: state.users.map(user => user.id === action.payload.id ? action.payload : user) };
        case "REMOVE_USER":
            return { ...state, users: state.users.filter((user) => user.id !== action.payload) };
        default:
            return state;
    }
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await getUsers();
            dispatch({ type: "SET_USERS", payload: fetchedUsers });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const addUser = async (user: IUser) => {
        try {
            const newUser = await createUser(user);
            dispatch({ type: "ADD_USER", payload: newUser });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const updateUser = async (id: string, user: IUser) => {
        try {
            const updatedUser = await changeUser({ userData: user, id });
            dispatch({ type: "UPDATE_USER", payload: updatedUser })
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const removeUser = async (id: string) => {
        try {
            await deleteUser(id);
            dispatch({ type: "REMOVE_USER", payload: id });
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const value = useMemo(() => ({
        users: state.users,
        fetchUsers,
        addUser,
        updateUser,
        removeUser
    }), [state.users]);

    return (
        <UserContext.Provider value={value}>
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