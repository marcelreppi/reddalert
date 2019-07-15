const { getDBClient } = require("./db")

const db = getDBClient()

const USER_COLLECTION = "users"

exports.saveSession = async (email, sessionId) => {
  return await db.collection(USER_COLLECTION).updateOne(
    {
      email,
    },
    {
      $set: { sessionId },
    },
    { upsert: true }
  )
}

exports.deleteSession = async sessionId => {
  return await db.collection(USER_COLLECTION).updateOne(
    {
      sessionId,
    },
    { $unset: { sessionId: "" } }
  )
}

exports.isValidSession = async sessionId => {
  const user = db.collection(USER_COLLECTION).findOne({ sessionId })
  if (user) {
    return true
  } else {
    return false
  }
}
