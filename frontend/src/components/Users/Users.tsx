import { useEffect, useReducer } from "react";
import { changeUser, createUser, deleteUser, getUsers } from "../../services/servicesUsers/user-crud";
import { IUser } from "../../api/api-interfaces/user-interface";
import LoadingDots from "../Loading/Loading";

//reducer
type Action =
    | { type: "SET_USER"; payload: IUser[] }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_VISIBILITY"; payload: boolean }
    | { type: "SET_EDIT_MODE"; payload: boolean }
    | { type: "SET_NEW_USER_DATA"; payload: Partial<IUser> }
    | { type: "ADD_USER"; payload: IUser }
    | { type: "EDIT_USER"; payload: IUser }
    | { type: "DELETE_USER"; payload: string };

const initialState = {
    users: [] as IUser[],
    loading: false,
    visibility: false,
    isEditMode: false,
    newUserData: { nickname: '', email: '', level: '' } as IUser
};

const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, users: action.payload };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_VISIBILITY":
            return { ...state, visibility: action.payload };
        case "SET_EDIT_MODE":
            return { ...state, isEditMode: action.payload };
        case "SET_NEW_USER_DATA":
            return { ...state, newUserData: { ...state.newUserData, ...action.payload } };
        case "ADD_USER":
            return { ...state, visibility: false, users: [...state.users, action.payload], newUserData: initialState.newUserData };
        case "EDIT_USER":
            return { ...state, visibility: false, isEditMode: false, newUserData: initialState.newUserData, users: state.users.map(user => user.id === action.payload.id ? action.payload : user) };
        default:
            return state;
    };
};

const Users = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        dispatch({ type: "SET_LOADING", payload: true });
        const users = await getUsers();
        dispatch({ type: "SET_USER", payload: users });
        dispatch({ type: "SET_LOADING", payload: false });
    };

    if (state.loading) { return <LoadingDots /> };

    const openForm = () => {
        dispatch({ type: "SET_VISIBILITY", payload: true });
        dispatch({ type: "SET_EDIT_MODE", payload: false });
        dispatch({ type: "SET_NEW_USER_DATA", payload: initialState.newUserData });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_NEW_USER_DATA", payload: { [name]: value } });
    };

    const handleAddUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newData = await createUser(state.newUserData);
        dispatch({ type: "ADD_USER", payload: newData });
    };

    const handleDeleteUser = async (userId: string | number) => {
        try {
            await deleteUser(userId.toString());
            await fetchUsers();
        } catch (error) {
            console.error(`Error deleting user with id ${userId}:`, error);
        }
    };

    const handleEditUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!state.newUserData) return;

        try {
            const updatedUser = await changeUser({ userData: state.newUserData, id: state.newUserData.id! });
            dispatch({ type: "EDIT_USER", payload: updatedUser })
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleEditButtonClick = (user: IUser) => {
        dispatch({ type: "SET_VISIBILITY", payload: true });
        dispatch({ type: "SET_EDIT_MODE", payload: true });
        dispatch({ type: "SET_NEW_USER_DATA", payload: user });
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
                    {state.users.map((user: IUser) =>
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
                {!state.visibility && <button className="btn btn-outline btn-secondary" onClick={openForm}>Add User</button>}
            </div>
            {
                state.visibility && <div className="user-form max-w-md self-center">
                    <div className="user-form-addUser">
                        <form className="flex flex-col gap-2">
                            <label className="input input-bordered flex items-center gap-2">
                                Name
                                <input type="text" className="grow" name="nickname" value={state.newUserData.nickname} onChange={handleInputChange} placeholder="Daisy" required />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Email
                                <input type="email" className="grow" name="email" value={state.newUserData.email} onChange={handleInputChange} placeholder="daisy@site.com" required />
                            </label>
                            <select className="select select-bordered w-full max-w-xs" name="level" value={state.newUserData.level} onChange={handleInputChange} required>
                                <option value="" disabled hidden>Select Level</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Beginner">Beginner</option>
                            </select>
                            <button className="btn btn-sm" onClick={state.isEditMode ? handleEditUser : handleAddUser}>
                                {state.isEditMode ? 'Update User' : 'Add User'}
                            </button>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
};

export default Users;