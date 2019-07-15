const MongoClient = require("mongodb").MongoClient

const MONGODB_URL =
  process.env.NODE_ENV === "production" ? process.env.MONGODB_PROD_URL : process.env.MONGODB_DEV_URL
const DB_NAME = process.env.NODE_ENV === "production" ? "reddalert" : "reddalert-dev"

const SUBREDDIT_COLLECTION = "subreddits"
const LATEST_POSTS_COLLECTION = "latest-posts"

let db = null
exports.connectToDB = async () => {
  await MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, poolSize: 10 })
    .then(client => {
      db = client.db(DB_NAME)
      console.log("Connected to MongoDB")
    })
    .catch(error => console.error(error))
}

exports.getDBClient = () => {
  return db
}
