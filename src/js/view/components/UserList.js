import {ViewModel} from "../ViewModel";
import {useEffect, useRef, useState} from "react";

const UserList = () => {

    const NAME = "UserList";

    const viewModel = useRef(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if(!viewModel.current) {
            viewModel.current = new ViewModel(NAME); // UserForm, UserRole etc.
            setUsers(viewModel.current.findAll());
        }
    }, []);

    return <>
        <header>
            <h2>User List (Functional)</h2>
        </header>
        <ol>
            {users.map(user => (
                <li key={user.id}>{user.first} {user.last} | {user.username} | {user.email}</li>
            ))}
        </ol>
    </>
}

export default UserList
