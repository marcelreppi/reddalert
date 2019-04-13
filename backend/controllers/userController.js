const { body, validationResult } = require("express-validator/check")
const { sanitize } = require("express-validator/filter")

const { getUserSubreddits } = require("../database/subredditDAO")
const userDAO = require("../database/userDAO")

exports.getUserSubreddits = async (req, res, next) => {
  const userData = await getUserSubreddits(req.params.email)
  res.json(userData)
}

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

exports.login = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }

  res.json({})
}

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
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }

  // Register user
  console.log("Register")

  res.json({})
}
