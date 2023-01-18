import React, { useState } from "react"
import UserDataService from "../services/user"
import Link from "react-router-dom"

import '../App.css';

const AddUser = props => {
    const initialUserState = {
        name: "", 
        type: "", 
        description: "",
    }; 

    const [user, setUser] = useState(initialUserState); 
    const [submitted, setSubmitted] = useState(false); 

    const handleInputChange = event => {
        const { name, value } = event.target; 
        setUser({...user, [name]: value})
    }

    const saveUser = () => {
        var data = {
            name: user.name, 
            type: user.type, 
            description: user.description
        }; 

        UserDataService.createUser(data)
        .then(response => {
            setSubmitted(true); 
            console.log(response.data); 
        })
    }

    return (
        <div>
            <div className="submit-form first">
                <h1 className="jobListing"><b>Create Job Posting</b></h1>
                {submitted ? (
                    <div>
                        <h4>Job listing created successfully!</h4>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name"><b>Listing Title</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required value={user.name}
                                onChange={handleInputChange}
                                name="name"
                                placeholder="Title of your post - summary of the issue"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description"><b>Description</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required value={user.description}
                                onChange={handleInputChange}
                                name="description"
                                placeholder="Provide details about the issue, including ZIP Code."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type"><b>Job Type</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="type"
                                required value={user.type}
                                onChange={handleInputChange}
                                name="type"
                                placeholder="E.g Carpenter, Mechanic, Plumber, etc."
                            />
                        </div>

                        <button onClick={saveUser} className="btn btn-success btn-warning">
                            Create Listing
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddUser; 