import "../css/layout.css";
import "../css/theme.css"
import {createContext, useState} from "react";
import UserList from "./view/components/UserList";
import UserForm from "./view/components/UserForm";
import UserRole from "./view/components/UserRole";
import {ApplicationFacade} from "./ApplicationFacade";
import {User} from "./model/vo/User";

ApplicationFacade.getInstance(ApplicationFacade.KEY).startup();

const ApplicationContext = createContext();

const Application = () => {

    const [users, setUsers] = useState(/** @type {User[]} */[]);
    const [user, setUser] = useState(/** @type {User} */ new User());

    return (
        <ApplicationContext.Provider value={{users, setUsers, user, setUser}}>
            <div className="fluid">
                <UserList />
                <UserForm />
                <UserRole />
            </div>
        </ApplicationContext.Provider>
    );
}

export { ApplicationContext };

export default Application;
