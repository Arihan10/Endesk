import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import UsersDAO from "./dao/usersDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
import express from "express"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 80

/*
if (process.env.NODE_ENV === "production") {
    app.use(express.static('./frontend/build'))
    app.get('*', (req, res) => {
        req.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')); 
    })
}
*/

MongoClient.connect(
    //process.env.USERS_DB_URI,
    "mongodb+srv://Arihan10:Ariaarav1@cluster0.ke9k6.mongodb.net/test_users?retryWrites=true&w=majority",
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500, 
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error("index.js error: " + err.stack)
    process.exit(1)
})
.then(async client => {
    await ReviewsDAO.injectDB(client)
    await UsersDAO.injectDB(client)

    app.listen(port, () => {
        console.log(`listening on port ${port} - from arihan`)
    })
})