import {ApplicationFacade} from "../ApplicationFacade";

export class ViewModel {

    constructor(name) {
        ApplicationFacade.getInstance(ApplicationFacade.KEY).register(name, this);
    }

    findAll() {
        return this.delegate.findAll();
    }

    set delegate(value) { this._delegate = value }

    get delegate() { return this._delegate }

}
