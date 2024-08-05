import {puremvc} from "@puremvc/puremvc-js-multicore-framework/bin/puremvc";
import {UserProxy} from "../model/UserProxy";
import {RoleProxy} from "../model/RoleProxy";

export class EmployeeAdminMediator extends puremvc.Mediator {

    static get NAME() { return "EmployeeAdminMediator" }

    constructor() {
        super(EmployeeAdminMediator.NAME, null);
    }

    onRegister() {
        this.userProxy = this.facade.retrieveProxy(UserProxy.NAME);
        this.roleProxy = this.facade.retrieveProxy(RoleProxy.NAME);
    }

    /** @returns {Promise<void>} */
    async getAllUsers() {
        this._users = await this.userProxy.getAllUsers();
    }

    async getAllDepartments() {
        this._departments = await this.userProxy.getAllDepartments();
    }

    async getAllRoles() {
        this._roles = await this.roleProxy.getAllRoles();
    }

    /** @returns {User[]} */
    get users() { return this._users }

    /** @returns {Department[]} */
    get departments() { return this._departments }

    /** @returns {Set<Role>} */
    get roles() {return this._roles }

}
