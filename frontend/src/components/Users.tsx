import { useEffect, useState } from "react";
import { createUser, deleteUser, getUsers } from "../services/servicesUsers/user-crud";
import { IUser } from "../api/api-interfaces/user-interface";

const Users = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [visibiliy, setVisibility] = useState<boolean>(false);

    const [newUserData, setNewUserData] = useState<IUser>({ nickname: '', email: '', level: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const users = await getUsers();
            setUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const openForm = () => {
        setVisibility(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUserData({ ...newUserData, [name]: value });
    };

    const handleAddUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await createUser(newUserData);
        setVisibility(false);
        setNewUserData({ nickname: '', email: '', level: '' });
        fetchUsers();
        console.log("prev users:", users);
    };

    const handleDeleteUser = async (userId: string) => {
        await deleteUser(userId);
        fetchUsers();
        console.log("users delete user:", users);
    };

    return (
        <div className="users-container flex flex-col gap-5">
            <div className="user-table overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nickname</th>
                            <th>Email</th>
                            <th>Level</th>
                        </tr>
                    </thead>
                    {users.map(user =>
                        <tbody key={user.id}>
                            <tr className="hover">
                                <th></th>
                                <td>{user.nickname}</td>
                                <td>{user.email}</td>
                                <td>{user.level}</td>
                                <td className="flex gap-2">
                                    <button className="btn btn-sm btn-outline btn-error" onClick={() => handleDeleteUser(user.id!)}>Del</button>
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
                                <input type="text" className="grow" name="nickname" value={newUserData.nickname} onChange={handleInputChange} placeholder="Daisy" required />
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
                            <button className="btn btn-sm" onClick={handleAddUser}>Add User</button>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
};

export default Users;