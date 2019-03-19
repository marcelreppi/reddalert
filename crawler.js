const { fetchRSSFeed, sendNotification } = require('./lib.js')

const subreddits = require('./subreddits.json').subreddits

async function checkReddit() {
  for (const sr of subreddits) {
    const feed = await fetchRSSFeed(sr.name)
    const keywordsRegex = new RegExp(sr.keywords.join('|'), 'gi')
    const matchingPosts = []
    for (const post of feed.items) { 
      if (post.title.match(keywordsRegex)) {
        matchingPosts.push(post)
      }
    }
    if (matchingPosts.length > 0) sendNotification(matchingPosts, sr.name)
  }
}

module.exports = { checkReddit }
