import {puremvc} from "@puremvc/puremvc-js-multicore-framework/bin/puremvc";
import {Role} from "./enum/Role";

export class RoleProxy extends puremvc.Proxy {

	static get NAME() { return "RoleProxy" }

	constructor() {
		super(RoleProxy.NAME, []);
	}

	getAllRoles() {
		return new Promise((resolve, reject) => {
			resolve(Role.comboList);
		});
	}

}