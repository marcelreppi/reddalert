const { body, validationResult } = require("express-validator/check")
const { sanitize } = require("express-validator/filter")
const passport = require("passport")
const bcrypt = require("bcrypt")
const uuidv4 = require("uuid/v4")

const { getUserSubreddits } = require("../database/subredditDAO")
const userDAO = require("../database/userDAO")
const sessionDAO = require("../database/sessionDAO")

exports.getUserSubreddits = async (req, res, next) => {
  const userData = await getUserSubreddits(req.params.email)
  res.json(userData)
}

exports.getUserSessionData = async (req, res) => {
  const user = await userDAO.getUserBySessionId(req.params.sessionId)

  if (!user) {
    res.sendStatus(404)
    return
  }

  res.json({ email: user.email, subreddits: user.subreddits })
}

////////////////////////////////// LOGIN /////////////////////////////////////

exports.validateLogin = [
  body("email")
    .isEmail()
    .trim()
    .withMessage("Your E-Mail is not valid!"),

  sanitize("email"),

  body("password")
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty!"),
]

exports.login = async (req, res) => {
  console.log("Login")
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array()[0] })
  }

  passport.authenticate("local", async (err, user, info) => {
    console.log("Authenticate")

    if (!user) {
      return res.json(info)
    }

    const sessionId = uuidv4()
    await sessionDAO.saveSession(user.email, sessionId)
    res.json({
      user: {
        email: user.email,
        subreddits: user.subreddits,
      },
      sessionId,
    })
  })(req, res)
}

exports.logout = async (req, res) => {
  console.log("Logout")
  await sessionDAO.deleteSession(req.body.sessionId)
  res.json({})
}

///////////////////////////////////// REGISTER //////////////////////////////////////

exports.validateRegister = [
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password needs a minimum length of 5 characters!"),
  body("confirmedPassword")
    .not()
    .isEmpty()
    .withMessage("Confirmed Password cannot be empty!"),
  body("confirmedPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Your passwords do not match")
    }
    return true
  }),
]

exports.register = async (req, res) => {
  console.log("Register")

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array()[0] })
  }

  // 1. Check if user with that email already exists
  const user = await userDAO.getUserByEmail(req.body.email)
  if (user) {
    return res.json({
      error: { msg: "A user with that E-Mail already exists!" },
    })
  }

  // 2. Hash password
  const saltRounds = 10
  const hash = await bcrypt.hash(req.body.password, saltRounds)

  // 3. Save new user
  userDAO.saveUser(req.body.email, hash)

  res.json({})
}
