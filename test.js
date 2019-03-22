// Set environment variables
require('dotenv').config({ path: 'variables.env' });

const { checkReddit } = require("./crawler")
const DAO = require("./db")

const test = async () => {
  // await checkReddit()
  console.log(await DAO.getUserData("test@gmail.com"))
  console.log(await DAO.addSubreddit("test@gmail.com", "Jokes"))
  console.log(await DAO.addSubreddit("test@gmail.com", "AskReddit"))
  console.log(await DAO.addKeyword("test@gmail.com", "AskReddit", "cooking"))
  console.log(await DAO.addKeyword("test@gmail.com", "AskReddit", "pets"))
  // console.log(await DAO.deleteSubreddit("test@gmail.com", "AskReddit"))
  console.log(await DAO.deleteKeyword("test@gmail.com", "AskReddit", "cooking"))
}

test()