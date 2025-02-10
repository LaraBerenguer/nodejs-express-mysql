import { useEffect, useState } from "react";
import { changeUser, createUser, deleteUser, getUsers } from "../../services/servicesUsers/user-crud";
import { IUser } from "../../api/api-interfaces/user-interface";

const Users = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [visibility, setVisibility] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
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
        setIsEditMode(false);
        setNewUserData({ nickname: '', email: '', level: '' });
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
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
    };

    const handleEditUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!newUserData) return;

        try {
            const updatedUser = await changeUser({ userData: newUserData, id: newUserData.id! });
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === newUserData.id ? updatedUser : user))
            );
            setNewUserData({ nickname: '', email: '', level: '' });
            setIsEditMode(false);
            setVisibility(false);            
        } catch (error) {
            console.log("Error updating user:", error);
        }
    };

    const handleEditButtonClick = (user: IUser) => {
        console.log("handleEditButtonClick", user);
        setIsEditMode(true);
        setNewUserData(user);
        setVisibility(true);
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
                                    <button className="btn btn-sm btn-outline btn-error" onClick={() => user.id && handleDeleteUser(user.id)}>Del</button>
                                    <button className="btn btn-sm btn-outline btn-success" onClick={() => handleEditButtonClick(user)}>Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            <div className="user-button self-center my-4">
                {!visibility && <button className="btn btn-outline btn-secondary" onClick={openForm}>Add User</button>}
            </div>
            {
                visibility && <div className="user-form max-w-md self-center">
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
                            <button className="btn btn-sm" onClick={isEditMode ? handleEditUser : handleAddUser}>
                                {isEditMode ? 'Update User' : 'Add User'}
                            </button>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
};

export default Users;