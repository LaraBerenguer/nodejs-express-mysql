import { useEffect, useState } from "react";
import { createUser, deleteUser, getUsers } from "../services/user-crud";
import { IUser } from "../api/api-interfaces/user-interface";
import { v4 as uuidv4 } from 'uuid';

const Users = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [visibiliy, setVisibility] = useState<boolean>(false);

    const [newUserData, setNewUserData] = useState<IUser>({ id: uuidv4(), name: '', lastname: '', email: '', level: '', game: '', location: '' });
    //class new user?
    //require no me vale

    useEffect(() => {
        setUsers(getUsers());
    }, []);

    const openForm = () => {
        setVisibility(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUserData({ ...newUserData, [name]: value });
    };

    const handleAddUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        createUser(newUserData);
        setVisibility(false);
        setNewUserData({ id: uuidv4(), name: '', lastname: '', email: '', level: '', game: '', location: '' });
        console.log("users add user:", users);
    };

    const handleDeleteUser = (userId: string) => {
        deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        console.log("users delete user:", users);
    };

    return (
        <div className="users-container flex flex-col gap-5">
            <div className="user-table overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Level</th>
                            <th>Game</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    {users.map(user =>
                        <tbody key={user.id}>
                            <tr className="hover">
                                <th></th>
                                <td>{user.name}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.level}</td>
                                <td>{user.game}</td>
                                <td>{user.location}</td>
                                <td className="flex gap-2">
                                    <button className="btn btn-sm btn-outline btn-error" onClick={() => handleDeleteUser(user.id)}>Del</button>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            <div className="user-button self-center my-4">
                {!visibiliy && <button className="btn btn-outline btn-primary" onClick={openForm}>Add User</button>}
            </div>
            {
                visibiliy && <div className="user-form max-w-md self-center">
                    <div className="user-form-addUser">
                        <form className="flex flex-col gap-2">
                            <label className="input input-bordered flex items-center gap-2">
                                Name
                                <input type="text" className="grow" name="name" value={newUserData.name} onChange={handleInputChange} placeholder="Daisy" required />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Last name
                                <input type="text" className="grow" name="lastname" value={newUserData.lastname} onChange={handleInputChange} placeholder="Smith" required />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Email
                                <input type="email" className="grow" name="email" value={newUserData.email} onChange={handleInputChange} placeholder="daisy@site.com" required />
                            </label>
                            <select className="select select-bordered w-full max-w-xs" name="level" value={newUserData.level} onChange={handleInputChange} required>
                                <option value="" disabled hidden>Select Level</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Beginner">Beginner</option>
                            </select>
                            <label className="input input-bordered flex items-center gap-2">
                                Location
                                <input type="text" className="grow" name="location" value={newUserData.location} onChange={handleInputChange} placeholder="Avinguda Diagonal" required />
                            </label>
                            <select className="select select-bordered w-full max-w-xs" name="game" value={newUserData.game} onChange={handleInputChange} required>
                                <option value="" disabled hidden>Game</option>
                                <option>Dungeons and Dragons</option>
                                <option>Pathfinder 2e</option>
                                <option>Vampire The Masquerade</option>
                                <option>Call of Cthulhu</option>
                            </select>
                            <button className="btn btn-sm" onClick={handleAddUser}>Add User</button>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
};

export default Users;