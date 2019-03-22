const axios = require('axios')

const { sendNotification } = require("./notify")

const bot = require("./bot.js")

const subreddits = require('./subreddits.json').subreddits
const latestPostIds = {}

async function fetchJSONFeed(subreddit) {
  let query = '?limit=100'
  if (latestPostIds[subreddit]) {
    query += `&before=${latestPostIds[subreddit]}`
  }
  
  const response = await axios.get(`https://www.reddit.com/r/${subreddit}/new.json${query}`) 
  const feed = response.data.data.children

  if (feed.length > 0) latestPostIds[subreddit] = feed[0].data.name
  return feed
}

checkReddit = async function() {
  let newPosts = false
  for (const sr of subreddits) {
    const feed = await fetchJSONFeed(sr.name)
    const keywordsRegex = new RegExp(sr.keywords.join('|'), 'gi')
    const matchingPosts = []
    for (const post of feed) { 
      if (post.data.title.match(keywordsRegex)) {
        matchingPosts.push(post)
      }
    }

    if (matchingPosts.length > 0) {
      newPosts = true
      const result = await sendNotification(sr.name, matchingPosts)
      console.log(result)
    }
  }

  if (!newPosts) {
    await bot.telegram.sendMessage(process.env.MY_CHAT_ID, `No new messages in any of the subreddits`)
  }
}

module.exports = { checkReddit }