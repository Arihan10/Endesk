import React from "react"; 
import { Switch, Route, Link } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css"; 

import AddReview from "./components/add-review";
import User from "./components/users";
import UsersList from "./components/users-list";
import Login from "./components/login";
import AddUser from "./components/add-user"

import './App.css';

function App() {
  const [user, setUser] = React.useState(null); 

  async function login(user = null) {
    setUser(user); 
  }

  async function logout() {
    setUser(null); 
  }

  return (
    <div className="App">
      <nav className="navbar fixed-top navbar-expand navbar-light bg-warning">
        <a href="/users" className="navbar-brand">
          Endesk
        </a>
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/users"} className="nav-link">
              Find Jobs
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/job"} className="nav-link">
              Create Jobs
            </Link>
          </li>
        </div>
        <div className="navbar-nav ms-auto loginItem">
          <li className="nav-item">

            { user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout <b>{user.name}</b>
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}

          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/users"]} component={UsersList} />
          <Route
            path="/users/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route
            path="/users/:id"
            render={(props) => (
              <User {...props} user={user} />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
          <Route
            path="/job"
            render={(props) => (
              <AddUser {...props} user={user} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;