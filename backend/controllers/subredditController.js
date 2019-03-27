const subredditDAO = require("../database/subredditDAO")

exports.addSubreddit = async (req, res, next) => {
  console.log("addSubreddit")
  const { email } = req.params
  const { subreddit, keywords } = req.body
  const result = await subredditDAO.addSubreddit(email, subreddit, keywords)
  res.json(result)
}

exports.deleteSubreddit = async (req, res, next) => {
  console.log("deleteSubreddit")
  const { email, subreddit } = req.params
  const result = await subredditDAO.deleteSubreddit(email, subreddit)
  res.json(result)
}

exports.addKeyword = async (req, res, next) => {
  console.log("addKeyword")
  const { email, subreddit } = req.params
  const { keyword } = req.body
  const result = await subredditDAO.addKeyword(email, subreddit, keyword)
  res.json(result)
}

exports.deleteKeyword = async (req, res, next) => {
  console.log("deleteKeyword")
  const { email, subreddit, keyword } = req.params
  const result = await subredditDAO.deleteKeyword(email, subreddit, keyword)
  res.json(result)
}

exports.getAllData = async (req, res, next) => {
  console.log("getAll")
  const result = await subredditDAO.getAllSubreddits()
  res.json(result)
}
