import express from "express"
import UsersCtrl from "./users.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(UsersCtrl.apiGetUsers)
router.route("/id/:id").get(UsersCtrl.apiGetUserById)
router.route("/types").get(UsersCtrl.apiGetUserByTypes)

router.route("/job").post(UsersCtrl.apiPostUser)

router
.route("/review")
.post(ReviewsCtrl.apiPostReview)
.put(ReviewsCtrl.apiUpdateReview)
.delete(ReviewsCtrl.apiDeleteReview)

export default router