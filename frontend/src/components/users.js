import React, { useState, useEffect } from "react"
import UserDataService from "../services/user"
import  { Link } from "react-router-dom"; 

const User = props => {
  const initialUserState = {
    id: null, 
    name: "", 
    type: "", 
    reviews: []
  }; 
  const [user, setUser] = useState(initialUserState); 

  const getUser = id => {
    UserDataService.get(id)
    .then(response => {
      setUser(response.data); 
      console.log(response.data); 
    })
    .catch(e => {
      console.log(e); 
    });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]); 

  const deleteReview = (reviewId, index) => {
    UserDataService.deleteReview(reviewId, props.user.id)
    .then(response => {
      setUser((prevState) => {
        prevState.reviews.splice(index, 1)
        return({
          ...prevState
        })
      })
    })
    .catch(e => {
      console.log(e); 
    })
  }

  return (
    <div className="first">
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>
            <strong>Job Type: </strong><em>{user.type}</em><br/><br/>
            {user.description}<br/>
          </p>
          <Link to={"/users/" + props.match.params.id + "/review"} className="btn btn-warning">
            Add Offer
          </Link>
          <h4><br/>Offers</h4>
          <div className="row">
            {user.reviews.length > 0 ? (
              user.reviews.map((review, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}<br/>
                          <strong>User: </strong>{review.name}<br/>
                          <strong>Date: </strong>{review.date}
                        </p>
                        {props.user && props.user.id === review.user_id && 
                          <div className="row">
                            <a onClick={() => deleteReview(review._id, index)} className="btn btn-warning col-lg-5 mx-1 mb-1 specialBtn">Delete</a>
                            <Link to={{
                              pathname: "/users/" + props.match.params.id + "/review", 
                              state: {
                                currentReview: review
                              }
                            }} className="btn btn-warning col-lg-5 mx-1 mb-1 specialBtn">Edit</Link>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-4">
                <p>Be the first one to make an offer!</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br/>
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default User;