import users from '../api/users-mockup-data.json';
import { IUser } from '../api/api-interfaces/user-interface';

//get
export const getUsers = () => {
    return users;
};

//post
export const createUser = (userData: IUser) => {  
    users.push(userData);
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
        id_location: '7',
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
        game: 'Pathfinder 2e'
    };

    users[userIndex] = { ...users[userIndex], ...newUser };
    return "user updated"
};

//delete
export const deleteUser = (id: string) => {
    const inputUser = id;
    const userIndex = users.findIndex(user => user.id === inputUser);

    if (userIndex !== -1) {
        users.splice(userIndex, 1)
    } else {
        return "user not found. Try again."
    };
};