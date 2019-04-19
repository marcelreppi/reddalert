const express = require("express")
const router = express.Router()

const userController = require("./controllers/userController.js")
const subredditController = require("./controllers/subredditController.js")

router.post("/login", userController.validateLogin, userController.login)
router.post(
  "/register",
  userController.validateLogin,
  userController.validateRegister,
  userController.register
)
router.post("/logout", userController.logout)
router.get("/session/:sessionId", userController.getUserSessionData)

router.get("/all", subredditController.getAllData)

router.get("/user/:email", userController.getUserSubreddits)

router.post("/user/:email/subreddit", subredditController.addSubreddit)
router.delete(
  "/user/:email/subreddit/:subreddit",
  subredditController.deleteSubreddit
)
router.post(
  "/user/:email/subreddit/:subreddit/keyword",
  subredditController.addKeyword
)
router.delete(
  "/user/:email/subreddit/:subreddit/keyword/:keyword",
  subredditController.deleteKeyword
)

module.exports = router
