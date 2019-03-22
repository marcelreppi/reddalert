const { addSubreddit, deleteSubreddit, addKeyword, deleteKeyword }= require("../db")

exports.addSubreddit = async (req, res, next) => {
  console.log("addSubreddit")
  const { email } = req.params
  const { subreddit, keywords } = req.body
  const result = await addSubreddit(email, subreddit, keywords)
  res.json(result)
}

exports.deleteSubreddit = async (req, res, next) => {
  console.log("deleteSubreddit")
  const { email, subreddit } = req.params
  const result = await deleteSubreddit(email, subreddit)
  res.json(result)
}

exports.addKeyword = async (req, res, next) => {
  console.log("addKeyword")
  const { email, subreddit } = req.params
  const { keyword } = req.body
  const result = await addKeyword(email, subreddit, keyword)
  res.json(result)
}

exports.deleteKeyword = async (req, res, next) => {
  console.log("deleteKeyword")
  const { email, subreddit, keyword } = req.params
  const result = await deleteKeyword(email, subreddit, keyword)
  res.json(result)
}