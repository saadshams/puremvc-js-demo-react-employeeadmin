import logo from './logo.svg';
import './App.css';
import UserList from "./js/view/components/UserList";
import {UserListComponent} from "./js/view/components/UserListComponent";

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <UserList />
            <UserListComponent />
          </header>
        </div>
    );
}

