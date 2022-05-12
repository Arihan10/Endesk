import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let users

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) return
        try {
            users = await conn.db(process.env.USERS_NS).collection("users")
        } catch (e) {
            console.error(`Unable to establish a collection handle in usersDAO: ${e}`)
        }
    }

    static async addUser(name, type, description) {
        try {
            const userDoc = {
                name: name, 
                type: type, 
                description: description,
            }

            return await users.insertOne(userDoc)
        } catch (e) {
            console.error(`Unable to create user: ${e}`)
        }
    }

    static async getUsers({
        filters = null, 
        page = 0, 
        usersPerPage = 20, 
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } else if ("type" in filters) {
                query = { "type": { $eq: filters["type"] } }
            }
        }

        let cursor

        try {
            cursor = await users.find(query);
        } catch (e) {
            console.error(`Unable to find issue command, ${e}`)
            return { usersList: [], totalNumUsers: 0 }
        }

        const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page)

        try {
            const usersList = await displayCursor.toArray()
            const totalNumUsers = await users.countDocuments(query)

            return { usersList, totalNumUsers}
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)

            return { usersList: [], totalNumUsers: 0 }
        }
    }

    static async getUserById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id)
                    }, 
                }, 
                {
                    $lookup: {
                        from: "reviews", 
                        let: {
                            id: "$_id", 
                        }, 
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$service_id", "$$id"], 
                                    }, 
                                }, 
                            }, 
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "reviews", 
                    }, 
                }, 
                {
                    $addFields: {
                        reviews: "$reviews", 
                    }, 
                }, 
            ]
            return await users.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getUserById: ${e}`)
            throw e
        }
    }

    static async getTypes() {
        let types = []
        try {
            types = await users.distinct("type")
            return types
        } catch (e) {
            console.error(`Unable to get types: ${e}`)
            return types
        }
    }
}