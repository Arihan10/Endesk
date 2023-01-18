import React, { useState } from "react"

const Login = props => {
    const initialUserState = {
        name: "", 
        id: "", 
    }; 

    const [user, setUser] = useState(initialUserState); 

    const handleInputChange = event => {
        const { name, value } = event.target; 
        setUser({...user, [name]: value}); 
    }; 

    const login = () => {
        props.login(user); 
        props.history.push('/'); 
    }

    return (
        <div className="submit-form first">
            <h1 className="jobListing"><b>Login</b></h1>
            <div>
                <div className="form-group">
                    <label htmlFor="user"><b>Username</b></label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required value={user.name}
                        onChange={handleInputChange}
                        name="name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="id"><b>UID</b></label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        required value={user.id}
                        onChange={handleInputChange}
                        name="id"
                    />
                </div>

                <button onClick={login} className="btn btn-success btn-warning">
                    Login
                </button>
            </div>
        </div>
  );
}

export default Login;