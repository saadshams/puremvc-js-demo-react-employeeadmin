import {puremvc} from "@puremvc/puremvc-js-multicore-framework/bin/puremvc";
import {StartupCommand} from "./controller/StartupCommand";

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

    startup() {
        this.sendNotification(ApplicationFacade.STARTUP);
    }

}