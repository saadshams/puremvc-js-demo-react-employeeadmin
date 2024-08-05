import {puremvc} from "@puremvc/puremvc-js-multicore-framework/bin/puremvc";
import {UserProxy} from "../model/UserProxy";
import {RoleProxy} from "../model/RoleProxy";
import {EmployeeAdminMediator} from "../view/EmployeeAdminMediator";
import {User} from "../model/vo/User";
import {Department} from "../model/enum/Department";
import {Role} from "../model/enum/Role";

export class StartupCommand extends puremvc.SimpleCommand {

    execute(notification) {
        let userProxy = new UserProxy();

        userProxy.add(new User(1, "lstooge", "Larry", "Stooge", "larry@stooges.com", "ijk456",
            Department.ACCT, new Set([Role.EMP_BENEFITS])));
        userProxy.add(new User(2, "cstooge", "Curly", "Stooge", "curly@stooges.com", "xyz987",
            Department.SALES, new Set([Role.ACCT_RCV, Role.GEN_LEDGER])));
        userProxy.add(new User(3, "mstooge", "Moe", "Stooge", "moe@stooges.com", "abc123",
            Department.PLANT, new Set([Role.PRODUCTION, Role.SALES, Role.SHIPPING])));

        this.facade.registerProxy(userProxy);
        this.facade.registerProxy(new RoleProxy());
        this.facade.registerMediator(new EmployeeAdminMediator());
    }

}