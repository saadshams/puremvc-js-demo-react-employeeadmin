import {puremvc} from "../api/puremvc-2.0.0";
import {User} from "../model/vo/User";
import {UserProxy} from "../model/UserProxy";
import {EmployeeAdminMediator} from "../view/EmployeeAdminMediator";

export class StartupCommand extends puremvc.SimpleCommand {

    execute(notification) {
        let userProxy = new UserProxy();
        userProxy.add(new User(1, "lstooge", "Larry", "Stooge", "larry@stooges.com"));
        userProxy.add(new User(2, "cstooge", "Curly", "Stooge", "curly@stooges.com"));
        userProxy.add(new User(3, "mstooge", "Moe", "Stooge", "moe@stooges.com"));

        this.facade.registerProxy(userProxy);
        this.facade.registerMediator(new EmployeeAdminMediator());
    }

}