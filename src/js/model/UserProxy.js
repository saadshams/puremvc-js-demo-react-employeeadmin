import {puremvc} from "@puremvc/puremvc-js-multicore-framework/bin/puremvc";
import {Department} from "./enum/Department";

export class UserProxy extends puremvc.Proxy {

    static get NAME() { return "UserProxy" }

    constructor() {
        super(UserProxy.NAME, []);
    }

    /** @param user User */
    add(user) {
        this.data.push(user);
    }

    /** @returns {Promise<User[]>} */
    getAllUsers(){
        return new Promise((resolve, reject) => {
            resolve(this.data);
        });
    }

    getAllDepartments() {
        return new Promise((resolve, reject) => {
            resolve(Department.comboList)
        });
    }

}
