import "../../../css/module_user.css"
import {useContext, useEffect, useRef, useState} from "react";
import {ApplicationContext} from "../../Application";
import {ApplicationFacade} from "../../ApplicationFacade";
import {EmployeeAdminMediator} from "../EmployeeAdminMediator";
import {User} from "../../model/vo/User";

const UserList = () => {

    const {users, setUsers, user, setUser} = useContext(ApplicationContext); // User Data
    const [form, setForm] = useState(0); // Input Data

    const mediator = useRef(ApplicationFacade.getInstance(ApplicationFacade.KEY)
        .retrieveMediator(EmployeeAdminMediator.NAME));

    useEffect(() => { // fetch all users
        (async() => {
            await mediator.current.getAllUsers();
            setUsers(mediator.current.users);
        })();
    }, [setUsers]);

    useEffect(() => {
        if (user.id === 0) setForm(0);
        else
        setUsers(state => // display or replace
            state.map(u => u.id === user.id ? user : u)
        );
    }, [user]);

    const handler = (event) => {
        const {name} = event.target;
        if (name === "userList_add") {
            setForm(0); // radio button state management
            setUser(new User()); // reset UserForm
        } else if (name === "userList_delete") {
            setUsers(state => state.filter(u => u.id !== user.id)); // remove an item
            setUser(new User()); // reset UserForm
        }
    }

    return (
        <section id="userList">
            <div className="wrapper">
                <header>
                    <h2>Users</h2>
                </header>
                <main>
                    <ul id="userList_table" className="table">
                        <li>
                            <span>Name</span>
                            <span>Username</span>
                            <span>First</span>
                            <span>Last</span>
                            <span>Email</span>
                            <span>Password</span>
                            <span>Department</span>
                        </li>
                        {users.map(user => (
                            <li key={`user_${user.id}`} onClick={ () => setUser(user) }>
                                <input type="radio" id={`user_${user.id}`} name="users" value={user.id}
                                       onChange={() => setForm(user.id)} checked={form === user.id} />
                                <label htmlFor={`user_${user.id}`}>
                                    <span>{user.last}, {user.first}</span>
                                    <span>{user.username}</span>
                                    <span>{user.first}</span>
                                    <span>{user.last}</span>
                                    <span>{user.email}</span>
                                    <span>{user.password}</span>
                                    <span>{user.department.name}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </main>
                <footer>
                    <button id="userList_add" name="userList_add" className="primary" onClick={handler}>Add</button>
                    <button id="userList_delete" name="userList_delete" className="outline-primary" onClick={handler} disabled={!user}>Delete</button>
                </footer>
            </div>
        </section>
    );
}

export default UserList
