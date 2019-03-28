const axios = require("axios")

const { getAllSubreddits } = require("./database/subredditDAO")
const { sendNotification } = require("./notify")

const bot = require("./bot.js")

const latestPostCreated = {}

async function fetchJSONFeed(subreddit) {
  const response = await axios.get(
    `https://www.reddit.com/r/${subreddit}/new.json?limit=100`
  )
  const feed = response.data.data.children

  // Find latest post from that subreddit and remove already seen posts
  const i = feed.findIndex(x => x.data.created <= latestPostCreated[subreddit])
  if (i !== -1) {
    feed.splice(i)
  }
  console.log(`Found ${feed.length} new posts in /r/${subreddit}:`)

  if (feed.length > 0) latestPostCreated[subreddit] = feed[0].data.created
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

    const keywordsRegexString = entry.keywords
      .map(k => {
        if (k.includes("AND")) {
          const words = k.split(" AND ")
          return `(${words.map(w => `(?=.*${w})`).join("")}).*`
        }
        return `(${k})`
      })
      .join("|")
    const keywordsRegex = new RegExp(keywordsRegexString, "gi")
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
