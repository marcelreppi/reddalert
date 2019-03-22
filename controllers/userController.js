const { getUserData }= require("../db")

exports.getUserData = async (req, res, next) => {
  const userData = await getUserData(req.params.email)
  res.json(userData)
}