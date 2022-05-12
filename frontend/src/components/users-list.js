import React, { useState, useEffect } from "react"
import UserDataService from "../services/user"
import  { Link } from "react-router-dom"; 

import '../App.css';

const UsersList = props => {
    const [users, setUsers] = useState([]); 
    const [searchName, setSearchName] = useState(""); 
    const [searchType, setSearchType] = useState(""); 
    const [types, setTypes] = useState(["All Types"]); 

    useEffect(() => {
        retrieveUsers(); 
        retrieveTypes(); 
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value; 
        setSearchName(searchName); 
    }

    const onChangeSearchType = e => {
        const searchType = e.target.value; 
        setSearchType(searchType); 
    }

    const retrieveUsers = () => {
        UserDataService.getAll()
        .then(response => {
            console.log(response.data); 
            setUsers(response.data.users); 
        })
        .catch (e => {
            console.log(e); 
        });
    }; 

    const retrieveTypes = () => {
        UserDataService.getTypes()
        .then(response => {
            console.log(response.data); 
            setTypes(["All Types"].concat(response.data)); 
        })
        .catch (e => {
            console.log(e); 
        });
    }; 

    const refreshList = () => {
        retrieveUsers(); 
    }

    const find = (query, by) => {
        UserDataService.find(query, by)
        .then(response => {
            console.log(response.data); 
            setUsers(response.data.users); 
        })
        .catch(e => {
            console.log(e); 
        }); 
    }; 

    const findByName = () => {
        find(searchName, "name")
    }; 

    const findByType = () => {
        if (searchType == "All Types") {
            refreshList(); 
        } else {
            find(searchType, "type")
        }
    };

    return (
        <div>
            <div className="row pb-1 first">
                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control nameSearch"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={onChangeSearchName}
                        //style={{width: "30%"}}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary nameButton"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="spacer"></div>
                <div className="input-group col-lg-4 typeSection">

                    <select onChange={onChangeSearchType} className="typeSearch form-select">
                        {types.map(type => {
                            return (
                                <option value={type}> { type } </option>
                            )
                        })}
                    </select>
                    <div className="input-group-append">
                        <button 
                            className="btn btn-outline-secondary typeButton"
                            type="button"
                            onClick={findByType}
                        >
                            Search
                        </button>
                    </div>

                </div>
            </div>
            <div className="row">
                {users.map((user) => {
                    return (
                        <div className="col-lg-4 pb-1">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <p className="card-text">
                                        {user.description}<br/><br/>
                                        <strong>Job Type: </strong><em>{user.type}</em><br/>
                                    </p>
                                    <div className="row">
                                        <Link to={"/users/"+user._id} className="btn btn-warning col-lg-5 mx-1 mb-1 specialBtn">
                                            Connect with listing
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default UsersList;