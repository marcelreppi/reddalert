// Set environment variables
require("dotenv").config()
const cron = require("node-cron")

async function start() {
  const db = require("./database/db")
  await db.connectToDB()

  // Trigger the cron job
  // Check reddit every hour
  const { checkReddit } = require("./crawler.js")
  cron.schedule("0 * * * *", async () => {
    console.log("Checking reddit!")
    // await checkReddit() FIX ME
  })

  // Start server
  const app = require("./app.js")
  const PORT = 3001
  app.listen(PORT, async () => {
    console.log("Server listening at http://localhost:" + PORT)
    // await checkReddit()
  })
}

start()
