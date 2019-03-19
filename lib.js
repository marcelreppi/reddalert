const RSSParser = require('rss-parser')
const nodemailer = require('nodemailer')

const latestPostIds = {}

module.exports.fetchRSSFeed = async function(subreddit) {
  const rssParser = new RSSParser
  let query = '?limit=100'
  if (latestPostIds[subreddit]) {
    query += `&before=${latestPostIds[subreddit]}`
  }
  const feed = await rssParser.parseURL(`https://www.reddit.com/r/${subreddit}/new.rss${query}`) 

  if (feed.items.length > 0) latestPostIds[subreddit] = feed.items[0].id
  return feed
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_SENDER,
    pass: process.env.MAIL_PW
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail server is ready");
  }
});

module.exports.sendNotification = async function(posts, subreddit) {
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to: process.env.MAIL_RECEIVER,
    subject: 'New interesting post in subreddit ' + subreddit,
    text: posts.map( p => `${p.title}\n${p.link}`).join("\n\n")
  };

  const info = await transporter.sendMail(mailOptions)
  console.log(info)

  return info
}