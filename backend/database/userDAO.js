const { getDBClient } = require("./db")

const db = getDBClient()

const USER_COLLECTION = "users"

exports.saveUser = async (email, password) => {
  return await db.collection(USER_COLLECTION).insertOne({
    email,
    password,
    subreddits: [],
  })
}

exports.getUserByEmail = async email => {
  return await db.collection(USER_COLLECTION).findOne({ email })
}

exports.getUserBySessionId = async sessionId => {
  return await db.collection(USER_COLLECTION).findOne({ sessionId })
}
