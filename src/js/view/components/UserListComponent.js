import {Component} from "react";
import {ApplicationFacade} from "../../ApplicationFacade";

export class UserListComponent extends Component {

    static get NAME() { return "UserListComponent" }

    constructor(props) {
        super(props);

        ApplicationFacade.getInstance(ApplicationFacade.KEY).register(UserListComponent.NAME, this);

        this.state = {
            users: this.delegate.findAll()
        }
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        const {users} = this.state;

        return (
            <>
                <header>
                    <h2>User List (Component)</h2>
                </header>
                <ol>
                    {users.map(user => (
                        <li key={user.id}>{user.first} {user.last} | {user.username} | {user.email}</li>
                    ))}
                </ol>
            </>
        );
    }

    set delegate(value) { this._delegate = value }

    get delegate() { return this._delegate }
}
