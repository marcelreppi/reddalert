const { getUserSubreddits } = require("../database/subredditDAO")

exports.getUserSubreddits = async (req, res, next) => {
  const userData = await getUserSubreddits(req.params.email)
  res.json(userData)
}
