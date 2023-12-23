import {useEffect, useRef, useState} from "react";
import {ApplicationFacade} from "../../ApplicationFacade";

const UserList = () => {

    const delegate = useRef(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if(!delegate.current) {
            delegate.current = ApplicationFacade.getInstance(ApplicationFacade.KEY).getDelegate();
            setUsers(delegate.current.findAll());
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
