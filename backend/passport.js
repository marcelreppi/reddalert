const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

const userDAO = require("./database/userDAO")

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function(email, password, cb) {
      const user = await userDAO.getUserByEmail(email)
      if (!user) {
        return cb(null, false, {
          error: { msg: "Invalid E-Mail or Password!" },
        })
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        return cb(null, false, {
          error: { msg: "Invalid E-Mail or Password!" },
        })
      }

      return cb(null, user)
    }
  )
)

passport.serializeUser(function(user, cb) {
  cb(null, user.email)
})

passport.deserializeUser(async function(email, cb) {
  const user = await userDAO.getUserByEmail(email)
  if (!user) return cb(null, false)
  cb(null, user)
})
