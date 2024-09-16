//
//  UserRole.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import styles from "../../../css/role.module.css"
import {useEffect, useImperativeHandle, useRef, useState} from "react";
import {ApplicationConstants} from "../../ApplicationConstants";
import {Role} from "../../model/valueObject/Role";

const UserRole = () => {

	const [roles, setRoles] = useState(/** @type Role[] */ []); // UI Data
	const [user, setUser] = useState(/** @type User */ null); // User/Service Data
	const [role, setRole] = useState(Role.NONE_SELECTED); // Input/Form Data
	const [error, setError] = useState(null);

	const ref = useRef({});

	useImperativeHandle(ref, () => ({
		UPDATE: "UserRoleUpdate",

		setRoles: setRoles,
		setUser: (u) => {
			setRole(Role.NONE_SELECTED);
			setUser(u);
		},
		setError: setError,
		reset: reset
	}));

	useEffect(() => {
		dispatchEvent(new CustomEvent(ApplicationConstants.USER_ROLE_MOUNTED, {detail: ref.current}));
		return () => {
			dispatchEvent(new CustomEvent(ApplicationConstants.USER_ROLE_UNMOUNTED));
		}
	}, [ref]);

	const onChange = (event) => {
		setRole(roles.find(r => r.id === parseInt(event.target.value)));
	}

	const onAdd = () => {
		setUser(state => {
			const data = {...state, roles: [...state.roles, roles.find(r => r.id === role.id)]};
			dispatchEvent(new CustomEvent(ref.current.UPDATE, {detail: data}));
			return data;
		});
	};

	const onRemove = () => {
		setUser(state => {
			const data = {...state, roles: user.roles.filter(r => r.id !== role.id)};
			dispatchEvent(new CustomEvent(ref.current.UPDATE, {detail: data}));
			return data;
		});
	};

	const reset = () => {
		setRole(Role.NONE_SELECTED);
		setUser(null);
	}

	return (
		<section id="role">
			{error ? (
				<div className={styles.role}>
					<header><h2>User Roles</h2></header>
					<main>Error: {error.message}</main>
				</div>
			) : (
				<div className={styles.role}>
					<header>
						<h2>User Roles</h2>
					</header>
					<main>
						<ul>
							{user && user.roles.map(r => (
								<li key={`role_${r.id}`}>{r.name}</li>
							))}
						</ul>
					</main>
					<footer>
						<label htmlFor="roles"></label>
						<select name="roles" value={role.id} onChange={onChange} disabled={user === null}>
							{roles.map(r => (
								<option key={`role_option${r.id}`} value={r.id}>{r.name}</option>
							))}
						</select>
						<button name="add" className="primary" onClick={() => onAdd()}
						        disabled={role === Role.NONE_SELECTED}>Add</button>
						<button name="remove" className="outline-primary" onClick={() => onRemove()}
						        disabled={role === Role.NONE_SELECTED}>Remove</button>
					</footer>
				</div>
			)}
		</section>
	);
};

export default UserRole