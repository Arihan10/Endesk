import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import UsersDAO from "./dao/usersDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
import express from "express"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

if (process.env.NODE_ENV === "production") {
    app.use(express.static('./build'))
    app.get('*', (req, res) => {
        req.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')); 
    })
}

MongoClient.connect(
    process.env.USERS_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500, 
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await ReviewsDAO.injectDB(client)
    await UsersDAO.injectDB(client)

    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})