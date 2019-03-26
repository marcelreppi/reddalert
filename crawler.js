const axios = require("axios")

const { getAllSubreddits } = require("./database/db")
const { sendNotification } = require("./notify")

const bot = require("./bot.js")

const latestPostIds = {}

async function fetchJSONFeed(subreddit) {
  let query = "?limit=100"
  if (latestPostIds[subreddit]) {
    query += `&before=${latestPostIds[subreddit]}`
  }

  const response = await axios.get(
    `https://www.reddit.com/r/${subreddit}/new.json${query}`
  )
  const feed = response.data.data.children

  if (feed.length > 0) latestPostIds[subreddit] = feed[0].data.name
  return feed
}

async function checkReddit() {
  const entries = await getAllSubreddits()

  const cachedUpdates = {}
  for (const entry of entries) {
    let feed
    if (cachedUpdates[entry.subreddit]) {
      feed = cachedUpdates[entry.subreddit]
    } else {
      feed = await fetchJSONFeed(entry.subreddit)
      cachedUpdates[entry.subreddit] = feed
    }

    const keywordsRegex = new RegExp(entry.keywords.values.join("|"), "gi")
    const matchingPosts = []
    for (const post of feed) {
      if (post.data.title.match(keywordsRegex)) {
        matchingPosts.push(post)
      }
    }

    if (matchingPosts.length > 0) {
      const result = await sendNotification(
        entry.email,
        entry.subreddit,
        matchingPosts
      )
      console.log(result)
    }
  }

  await bot.telegram.sendMessage(
    process.env.MY_CHAT_ID,
    `Successfully executed checkReddit on reddalert server`
  )
}

module.exports = { checkReddit }
