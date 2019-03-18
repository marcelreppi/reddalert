const cron = require('node-cron')

// Set environment variables
require('dotenv').config({ path: 'variables.env' });

const { fetchRSSFeeds, sendNotification } = require('./lib.js')

const subreddits = require('./subreddits.json').subreddits

async function checkReddit() {
  const feeds = await fetchRSSFeeds(subreddits.map( sr => sr.name ))
  
  for (const [i, feed] of feeds.entries()) {
    const keywordsRegex = new RegExp(subreddits[i].keywords.join('|'), 'gi')
    for (const post of feed.items) {
      if (post.title.match(keywordsRegex)) {
        sendNotification(post.link, subreddits[i].name)
      }
    }
  }
}

// Check reddit every hour
cron.schedule('0 * * * *', async () => {
  console.log('Checking reddit!')
  await checkReddit()
})
