import {puremvc} from "../api/puremvc-2.0.0";

export class UserProxy extends puremvc.Proxy {

    static get NAME() { return "UserProxy" }

    constructor() {
        super(UserProxy.NAME, []);
    }

    /** @param user {User} */
    add(user) {
        this.data.push(user);
    }

    /** @returns {User[]} */
    get users() { return this.data }

}