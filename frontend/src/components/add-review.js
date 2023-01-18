import React, { useState } from "react"
import UserDataService from "../services/user"
import { Link, Redirect } from "react-router-dom"

const AddReview = props => {
    let initialReviewState = ""; 

    let editing = false; 

    if (props.location.state && props.location.state.currentReview) {
        editing = true; 
        initialReviewState = props.location.state.currentReview.text; 
    }

    const [review, setReview] = useState(initialReviewState); 
    const [submitted, setSubmitted] = useState(false); 

    const handleInputChange = event => {
        setReview(event.target.value); 
    }

    const saveReview = () => {
        var data = {
            text: review, 
            name: props.user.name, 
            user_id: props.user.id, 
            service_id: props.match.params.id
        }; 

        if (editing) {
            data.review_id = props.location.state.currentReview._id; 
            UserDataService.updateReview(data)
            .then(response => {
                setSubmitted(true); 
                console.log(response.data); 
            })
            .catch(e => {
                console.log(e); 
            })
        } else {
            UserDataService.createReview(data)
            .then(response => {
                setSubmitted(true); 
                console.log(response.data); 
            })
        }
    }

    return (
        <div>
            {props.user ? (
                <div className="submit-form first">
                    {submitted ? (
                        <div>
                            <h4>Offer submitted successfully!</h4>
                            <Link to={"/users/" + props.match.params.id} className="btn btn-success">
                                Back to job
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="description">{ editing ? "Edit" : "Create" } Offer</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="text"
                                    required value={review}
                                    onChange={handleInputChange}
                                    name="text"
                                />
                            </div>
                            <button onClick={saveReview} className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    Please log in. 
                    <Redirect to='/login'  />
                </div>
            )}
        </div>
  );
}

export default AddReview;