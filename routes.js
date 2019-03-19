const express = require("express")
const router = express.Router()

const userController = require("./controllers/userController.js")
const subredditController = require("./controllers/subredditController.js")

router.get("/user/:id", userController.getUser)

router.post("/user/:id/subreddit", subredditController.addSubreddit)
router.delete("/user/:id/subreddit", subredditController.deleteSubreddit)

router.post("/user/:id/:subreddit/keyword", subredditController.addKeyword)
router.delete("/user/:id/:subreddit/keyword", subredditController.deleteKeyword)

module.exports = router