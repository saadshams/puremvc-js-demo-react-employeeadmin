import {Department} from "../enum/Department";

export class User {

    /**
     * @param {number} id
     * @param {string} username
     * @param {string} first
     * @param {string} last
     * @param {string} email
     * @param {string} password
     * @param {Department} department
     * @param {Set<Role>} roles
     */
    constructor(id = 0, username = "", first = "", last= "", email = "", password= "", department = Department.NONE_SELECTED, roles = new Set()) {
        this.id = id;
        this.username = username;
        this.first = first;
        this.last = last;
        this.email = email;
        this.password = password;
        this.department = department;
        this.roles = roles;
    }

}