const sessionDAO = require("../database/sessionDAO")

exports.validateSession = async (req, res, next) => {
  console.log("Check session")
  if (!req.body.sessionId) {
    console.log("Body is missing sessionId")
    return res.sendStatus(400)
  }

  if (!sessionDAO.isValidSession(req.body.sessionId)) {
    console.log("Session invalid")
    return res.sendStatus(400)
  }

  next()
}
