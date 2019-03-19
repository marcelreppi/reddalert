const cron = require('node-cron')

// Set environment variables
require('dotenv').config({ path: 'variables.env' });

const app = require("./app.js")
const { checkReddit } = require("./crawler.js")

// Trigger the cron job
// Check reddit every hour
cron.schedule('0 * * * *', async () => {
  console.log('Checking reddit!')
  await checkReddit()
})

// Start server
const PORT = 3000
app.listen(PORT, async () => {
  console.log("Server listening at http://localhost:" + PORT)
  // await checkReddit()
})

