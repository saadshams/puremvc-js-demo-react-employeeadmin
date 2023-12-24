import {puremvc} from "../api/puremvc-2.0.0";
import {UserProxy} from "../model/UserProxy";

export class EmployeeAdminMediator extends puremvc.Mediator {

    static get NAME() { return "EmployeeAdminMediator" }

    constructor() {
        super(EmployeeAdminMediator.NAME, null);
    }

    onRegister() {
        this.userProxy = this.facade.retrieveProxy(UserProxy.NAME);

        // let self = this;
        // function IUserList() {
        //     this.findAll = self.findAll.bind(self);
        // }
        // this.delegate = new IUserList();

        this.delegate = { // shorter version
            findAll: () => this.findAll()
        }
    }

    getDelegate() {
        return this.delegate;
    }

    findAll() {
        return this.userProxy.users;
    }

}