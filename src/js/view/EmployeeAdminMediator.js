import {puremvc} from "../api/puremvc-2.0.0";
import {UserProxy} from "../model/UserProxy";

export class EmployeeAdminMediator extends puremvc.Mediator {

    constructor(name, viewComponent) {
        super(name, viewComponent);
    }

    onRegister() {
        this.userProxy = this.facade.retrieveProxy(UserProxy.NAME);

        let self = this;
        function IUserList() {
            this.findAll = self.findAll.bind(self);
        }
        this.viewComponent.delegate = new IUserList();
    }

    findAll() {
        return this.userProxy.users;
    }

}