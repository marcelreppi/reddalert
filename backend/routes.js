const express = require("express")
const router = express.Router()

const userController = require("./controllers/userController.js")
const subredditController = require("./controllers/subredditController.js")
const sessionController = require("./controllers/sessionController")

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

router.get("/user/:email", sessionController.validateSession, userController.getUserSubreddits)

router.post(
  "/user/:email/subreddit",
  sessionController.validateSession,
  subredditController.addSubreddit
)
router.delete(
  "/user/:email/subreddit/:subreddit",
  sessionController.validateSession,
  subredditController.deleteSubreddit
)
router.post(
  "/user/:email/subreddit/:subreddit/keyword",
  sessionController.validateSession,
  subredditController.addKeyword
)
router.delete(
  "/user/:email/subreddit/:subreddit/keyword/:keyword",
  sessionController.validateSession,
  subredditController.deleteKeyword
)

module.exports = router
