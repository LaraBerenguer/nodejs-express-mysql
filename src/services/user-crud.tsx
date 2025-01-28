import { v4 as uuidv4 } from 'uuid';
import users from '../api/users-mockup-data.json';
import { IUser } from '../api/api-interfaces/user-interface';

//get
export const getUsers = () => {
    return users;
};

//post
export const createUser = () => {
    const newUser: IUser = {
        id: uuidv4(),
        name: 'New',
        lastname: 'User',
        email: 'newuser@email.com',
        level: 'Advanced',
        location: 'Carrer de Valencia',
        lang: 2.168638,
        lat: 41.396710,
        game: 'Dungeons and Dragons'
    };

    users.push(newUser);
};

//put
export const changeUser = () => {
    const inputUser = "newuser@email.com";
    const foundUser = users.find(user => user.email === inputUser);
    const userIndex = users.findIndex(user => user.email === inputUser);

    if (!foundUser) {
        return "user not found. Try again."
    };

    const updatedUser: IUser = {
        id: users[userIndex].id,
        name: 'Other',
        lastname: 'User',
        email: 'otheruser@email.com',
        level: 'Advanced',
        location: 'Carrer de Mallorca',
        lang: 2.174356,
        lat: 41.385064,
        game: 'Dungeons and Dragons'
    };

    users[userIndex] = updatedUser;
    return "user updated";
};

//patch
export const modifyUser = () => {
    const inputUser = "newuser@email.com";
    const foundUser = users.find(user => user.email === inputUser);
    const userIndex = users.findIndex(user => user.email === inputUser);

    if (!foundUser) {
        return "user not found. Try again."
    };

    const newUser: Partial<IUser> = {
        ...foundUser,
        location: 'Plazça de Espanya',
        lang: 2.148108,
        lat: 41.375517,
        game: 'Pathfinder 2e'
    };

    users[userIndex] = { ...users[userIndex], ...newUser };
    return "user updated"
};

//delete
export const deleteUser = () => {
    const inputUser = "newuser@email.com";
    const userIndex = users.findIndex(user => user.email === inputUser);

    if (userIndex !== -1) {
        users.splice(userIndex, 1)
    } else {
        return "user not found. Try again."
    };
};