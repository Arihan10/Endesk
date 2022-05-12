import axois from "axios"

export default axois.create({
    baseURL: "http://localhost:5000/api/v1/users", 
    headers: {
        "Content-type": "application/json"
    }
}); 