import "../../../css/module-form.css"
import {useContext, useEffect, useRef, useState} from "react";
import {ApplicationContext} from "../../Application";
import {ApplicationFacade} from "../../ApplicationFacade";
import {EmployeeAdminMediator} from "../EmployeeAdminMediator";
import {User} from "../../model/vo/User";

const UserForm = () => {

	const [departments, setDepartments] = useState([]); // UI Data
	const {users, setUsers, user, setUser} = useContext(ApplicationContext); // User Data
	const [form, setForm] = useState(new User()); // Input Data

	const mediator = useRef(ApplicationFacade.getInstance(ApplicationFacade.KEY)
		.retrieveMediator(EmployeeAdminMediator.NAME));

	useEffect(() => { // UI Data: Fetch departments
		(async() => {
			await mediator.current.getAllDepartments();
			setDepartments(mediator.current.departments)
		})();
	}, []);

	useEffect(() => {
		setForm(user);
	}, [user]);

	const handler = (event) => {
		const {name, value} = event.target;

		if (name === "userForm_submit") {
			if (form.id !== 0) { // update
				setUsers(state => state.map(u => u.id === form.id ? form : u));
				setUser(new User());
			} else {
				setUsers(state => [ // save
					...state, {...form, id: users.length > 0 ? users[users.length - 1].id + 1 : 1, roles: new Set()}
				]);
			}
		} else if (name === "userForm_cancel") { // todo: reset user or clear the fields if user.id === 0
			setForm(new User()); // reset back to original user
			setUser(new User());
		} else {
			setForm(state => ({ // update fields
				...state, [name]: name === "department" ? departments.find(d => d.id === parseInt(value)) : value
			}));
		}
	}

	return (
		<section id="userForm">
			<div className="wrapper">
				<header>
					<button id="userForm_back" className="outline-primary"> Back</button>
					<h2>User Form</h2>
					<button id="userForm_role" className="outline-primary">Roles</button>
				</header>
				<main>
					<ul>
						<li>
							<label htmlFor="first">First Name:</label>
							<input type="text" id="first" name="first" value={form.first} onChange={handler} required />
						</li>
						<li>
							<label htmlFor="last">Last Name:</label>
							<input type="text" id="last" name="last" value={form.last} onChange={handler} required />
						</li>
						<li>
							<label htmlFor="email">Email:</label>
							<input type="email" id="email" name="email" value={form.email} onChange={handler} required />
						</li>
						<li>
							<label htmlFor="username">Username:</label>
							<input type="text" id="username" name="username" value={form.username} onChange={handler} required />
						</li>
						<li>
							<label htmlFor="password">Password:</label>
							<input type="password" id="password" name="password" value={form.password} onChange={handler} required />
						</li>
						<li>
							<label htmlFor="confirm">Confirm:</label>
							<input type="password" id="confirm" name="confirm" value={form.password} onChange={handler} required />
						</li>
						<li>
							<label htmlFor="department">Department:</label>
							<select id="department" name="department" value={form.department.id} onChange={handler}>
								{departments.map(department => (
									<option key={`department_${department.id}`} value={department.id}>{department.name}</option>
								))}
							</select>
						</li>
					</ul>
				</main>
				<footer>
					<button id="userForm_submit" name="userForm_submit" className="primary" onClick={handler} disabled={!form}>{form.id === 0 ? "Save" : "Update"}</button>
					<button id="userForm_cancel" name="userForm_cancel" className="outline-primary" onClick={handler} disabled={!form}>Cancel</button>
				</footer>
			</div>
		</section>
	)
}

export default UserForm
