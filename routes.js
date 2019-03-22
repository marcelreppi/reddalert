const express = require("express")
const router = express.Router()

const userController = require("./controllers/userController.js")
const subredditController = require("./controllers/subredditController.js")

router.get("/user/:email", userController.getUserData)

router.post("/user/:email/subreddit", subredditController.addSubreddit)
router.delete("/user/:email/subreddit/:subreddit", subredditController.deleteSubreddit)

router.post("/user/:email/subreddit/:subreddit/keyword", subredditController.addKeyword)
router.delete("/user/:email/subreddit/:subreddit/keyword/:keyword", subredditController.deleteKeyword)

module.exports = router