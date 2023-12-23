import {puremvc} from "./api/puremvc-2.0.0"
import {StartupCommand} from "./controller/StartupCommand";
import {EmployeeAdminMediator} from "./view/EmployeeAdminMediator";

export class ApplicationFacade extends puremvc.Facade {

    static get KEY() { return "EmployeeAdmin" }
    static get STARTUP() { return "startup" }

    constructor(key) {
        super(key);
    }

    initializeController() {
        super.initializeController();
        this.registerCommand(ApplicationFacade.STARTUP, () => new StartupCommand());
    }

    static getInstance(key) {
        return puremvc.Facade.getInstance(key, (k) => new ApplicationFacade(k));
    }

    register(name, component) {
        this.removeMediator(name + "Mediator");
        this.registerMediator(new EmployeeAdminMediator(name + "Mediator", component));
    }

    startup(root) {
        this.sendNotification(ApplicationFacade.STARTUP, root);
    }

}