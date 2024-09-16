//
//  UserList.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import styles from "../../../css/list.module.css"
import {useEffect, useImperativeHandle, useRef, useState} from "react";
import {ApplicationConstants} from "../../ApplicationConstants";
import {User} from "../../model/valueObject/User";

const UserList = () => {

    const [users, setUsers] = useState([]); // User/Service Data
    const [selectedUser, setSelectedUser] = useState(null); // Input/Form Data
    const [error, setError] = useState(null);

    const ref = useRef({});

    useImperativeHandle(ref, () => ({
        NEW: "UserListNew",
        SELECT: "UserListSelect",
        DELETE: "UserListDelete",

        setUsers: setUsers,
        addUser: (user) => {
            setUsers(state => [...state, user]);
        },
        updateUser: (user) => {
            setUsers(state => state.map(u => u.id === user.id ? user : u));
            setSelectedUser(null);
        },
        updateRoles: (user) => {
            setUsers(state => state.map(u => u.id === user.id ? user : u));
        },
        deSelect: () => {
            setSelectedUser(null);
        },
        setError: setError
    }));

    useEffect(() => {
        dispatchEvent(new CustomEvent(ApplicationConstants.USER_LIST_MOUNTED, {detail: ref.current}));
        return () => {
            dispatchEvent(new CustomEvent(ApplicationConstants.USER_LIST_UNMOUNTED));
        }
    }, [ref]);

    const onNew = () => {
        dispatchEvent(new CustomEvent(ref.current.NEW, {detail: new User()}));
        setSelectedUser(null);
    }

    const onSelect = (user) => {
        dispatchEvent(new CustomEvent(ref.current.SELECT, {detail: user}));
        setSelectedUser(user);
    }

    const onDelete = (user) => {
        dispatchEvent(new CustomEvent(ref.current.DELETE, {detail: user}))
        setUsers(state => state.filter(u => u.id !== user.id));
        setSelectedUser(null);
    }

    return (
        <section id="list">
            {error ? (
                <div className={styles.list}>
                    <header><h2>User List</h2></header>
                    <main>Error: {error.message}</main>
                </div>
            ) : (
                <div className={styles.list}>
                    <header>
                        <h2>User List</h2>
                    </header>
                    <main>
                        <ul>
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
                                <li key={`user_${user.id}`}>
                                    <input type="radio" id={`users_radio${user.id}`} name="users" value={user.id}
                                           onChange={() => onSelect(user)}
                                           checked={selectedUser !== null && selectedUser.id === user.id}/>

                                    <label htmlFor={`users_radio${user.id}`}>
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
                        <button name="add" className="primary" onClick={() => onNew()}>Add</button>
                        <button name="delete" className="outline-primary" onClick={() => onDelete(selectedUser)}
                                data-disabled={selectedUser === null}>Delete</button>
                    </footer>
                </div>
            )}
        </section>
    );
};

export default UserList
