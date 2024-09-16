//
//  Department.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

export class Department {

	static NONE_SELECTED = new Department(0, "---None Selected---");

	/**
	 * @param {number} id
	 * @param {string} name
	 */
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}

	static fromJson({id, name}) {
		return new Department(id, name);
	}

}