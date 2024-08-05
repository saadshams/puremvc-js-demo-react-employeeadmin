import "../../../css/module-role.css"
import {useContext, useEffect, useRef, useState} from "react";
import {ApplicationContext} from "../../Application";
import {ApplicationFacade} from "../../ApplicationFacade";
import {EmployeeAdminMediator} from "../EmployeeAdminMediator";

const UserRole = () => {

	const [roles, setRoles] = useState(/** @type Set<Role> */ new Set()); // UI Data
	const {user, setUser} = useContext(ApplicationContext); // User Data
	const [form, setForm] = useState(/** @type Role */ null); // Input Data
	const rolesRef = useRef(null); // DOM Element - roles dropdown

	const mediator = useRef(ApplicationFacade.getInstance(ApplicationFacade.KEY)
		.retrieveMediator(EmployeeAdminMediator.NAME));

	useEffect(() => { // fetch roles
		(async() => {
			await mediator.current.getAllRoles();
			setRoles(mediator.current.roles);
		})();
	}, [user]);

	const handler = (event) => {
		const {name, value} = event.target;

		if (name === "roles") { // dropdown change: set selected role and update button states
			setForm( [...roles].find(r => r.id === parseInt(value) ));
		} else if (name === "userRole_add" && user !== null) { // Add role to the user's roles set
			setUser(state => ( {...state, roles: new Set([...state.roles, form]) } ));
			setForm(null);
			rolesRef.current.value = 0;
		} else if (name === "userRole_remove" && user !== null) { // Remove the selected role and update user's roles set
			setUser(state => ( {...state, roles: new Set([...state.roles].filter(r => r !== form)) } ));
			setForm(null);
			rolesRef.current.value = 0;
		}
	}

	return (
		<section id="userRole">
			<div id="screen"></div>
			<div className="wrapper">
				<header>
					<h2>User Roles</h2>
					<button id="userRole_dismiss" className="outline-primary">Dismiss</button>
				</header>
				<main>
					<ul id="userRole_list" className="list">
						{user ? [...user.roles].map(r => (
							<li key={`role_${r.id}`}>{r.name}</li>
						)) : []}
					</ul>
				</main>
				<footer>
					<label htmlFor="roles"></label>
					<select id="roles" name="roles" ref={rolesRef} onChange={handler}>
						{[...roles].map(role => (
							<option key={`role_${role.id}`} value={role.id}>{role.name}</option>
						))}
					</select>
					<button id="userRole_add" name="userRole_add" className="primary" onClick={handler} disabled={form ? form.id === 0 : true}>Add</button>
					<button id="userRole_remove" name="userRole_remove" className="outline-primary" onClick={handler} disabled={form ? form.id === 0 : true}>Remove</button>
				</footer>
			</div>
		</section>
	);
}

export default UserRole
