const express = require("express")
const cors = require("cors")
const passport = require("passport")

const routes = require("./routes.js")
require("./passport")

const app = express()

app.use(cors())

app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

app.use("/", routes)

module.exports = app
