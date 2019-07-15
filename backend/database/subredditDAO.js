const { db } = require("./db")

const USER_COLLECTION = "users"

exports.getUserSubreddits = async function(email) {
  email = email.toLowerCase()
  const user = await db.collection(USER_COLLECTION).findOne({ email })
  return user.subreddits
}

exports.addSubreddit = async function(email, subreddit, keywords) {
  email = email.toLowerCase()
  subreddit = subreddit.toLowerCase()
  keywords = keywords.map(kw => kw.toLowerCase())
  return await db
    .collection(USER_COLLECTION)
    .updateOne({ email }, { $push: { subreddits: { name: subreddit, keywords } } })
}

exports.addKeyword = async function(email, subreddit, keyword) {
  email = email.toLowerCase()
  subreddit = subreddit.toLowerCase()
  keyword = keyword.toLowerCase()
  const user = await db.collection(USER_COLLECTION).findOne({ email })
  const { keywords } = user.subreddits.find(sr => sr.name === subreddit)
  keywords.push(keyword)
  return await db
    .collection(USER_COLLECTION)
    .updateOne({ email }, { $set: { subreddits: user.subreddits } })
}

exports.deleteSubreddit = async function(email, subreddit) {
  email = email.toLowerCase()
  subreddit = subreddit.toLowerCase()
  const user = await db.collection(USER_COLLECTION).findOne({ email })
  const i = user.subreddits.findIndex(sr => sr.name === subreddit)
  user.subreddits.splice(i, 1)
  return db
    .collection(USER_COLLECTION)
    .updateOne({ email }, { $set: { subreddits: user.subreddits } })
}

exports.deleteKeyword = async function(email, subreddit, keyword) {
  email = email.toLowerCase()
  subreddit = subreddit.toLowerCase()
  keyword = keyword.toLowerCase()
  const user = await db.collection(USER_COLLECTION).findOne({ email })
  const sr = user.subreddits.find(sr => sr.name === subreddit)
  const i = sr.keywords.findIndex(kw => kw === keyword)
  sr.keywords.splice(i, 1)
  return db
    .collection(USER_COLLECTION)
    .updateOne({ email }, { $set: { subreddits: user.subreddits } })
}
