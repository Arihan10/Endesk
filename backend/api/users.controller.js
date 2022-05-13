import UsersDAO from "../dao/usersDAO.js"

export default class UsersController {
    static async apiPostUser(req, res, next) {
        try {
            const name = req.body.name
            const type = req.body.type
            const description = req.body.description

            const UserResponse = await UsersDAO.addUser(
                name, 
                type,
                description,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetUsers(req, res, next) {
        const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.type) {
            filters.type = req.query.type
        } else if (req.query.name) {
            filters.name = req.query.name
        }

        const { usersList, totalNumUsers } = await UsersDAO.getUsers({
            filters, 
            page, 
            usersPerPage, 
        })

        let response = {
            users: usersList, 
            page: page, 
            filters: filters, 
            entries_per_page: usersPerPage, 
            total_results: totalNumUsers,
        }
        res.json(response)
        //res.write(JSON.stringify(response))
    }

    static async apiGetUserById(req, res, next) {
        try {
            let id = req.params.id || {}
            let user = await UsersDAO.getUserById(id)
            if (!user) {
                res.status(404).json({ error: "Not found - apiGetUserByID, users controller js" })
                return
            }
            res.json(user)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json()
        }
    }

    static async apiGetUserByTypes(req, res, next) {
        try {
            let types = await UsersDAO.getTypes()
            res.json(types)
        } catch (e) {
            console.error(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}