const nodemailer = require("nodemailer")

const bot = require("./bot.js")

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_SENDER,
    pass: process.env.MAIL_PW,
  },
})

// transporter.verify(function(error, success) {
//   if (error) {
//     console.log(error)
//   } else {
//     console.log("Mail server is ready")
//   }
// })

async function sendNotification(email, subreddit, posts) {
  const subject = "New interesting post(s) in subreddit " + subreddit
  const content = `${posts
    .map(p => `${p.data.title}\n${p.data.url}`)
    .join("\n\n")}`
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to: email,
    subject,
    text: content,
  }

  if (process.env.NODE_ENV == "dev") {
    return await bot.telegram.sendMessage(
      process.env.MY_CHAT_ID,
      `${subject}:\n\n${content}`
    )
  } else {
    return await transporter.sendMail(mailOptions)
  }
}

module.exports = { sendNotification }
