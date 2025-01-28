import { v4 as uuidv4 } from 'uuid';
import users from '../api/users-mockup-data.json';
import {IUser} from '../api/api-interfaces/user-interface';

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
//patch
//delete