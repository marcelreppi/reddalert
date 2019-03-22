// Set environment variables
require('dotenv').config({ path: 'variables.env' });

const { checkReddit } = require("./crawler")
const DAO = require("./db")

const test = async () => {
  
  // console.log(await DAO.getUserData("test@gmail.com"))
  // console.log(await DAO.getUserData("test2@gmail.com"))

  // console.log(await DAO.addSubreddit("test@gmail.com", "Jokes", ["lol"]))
  // console.log(await DAO.addSubreddit("test@gmail.com", "AskReddit", ["news", "cars"]))
  // console.log(await DAO.addSubreddit("test2@gmail.com", "AskReddit", ["pets", "cars"]))
  // console.log(await DAO.addSubreddit("test2@gmail.com", "Jokes", ["haha"]))
  // console.log(await DAO.addSubreddit("test2@gmail.com", "LOL", ["xD", "rofl"]))

  // console.log(await DAO.addKeyword("test@gmail.com", "AskReddit", "cooking"))
  // console.log(await DAO.addKeyword("test@gmail.com", "AskReddit", "pets"))
  // console.log(await DAO.addKeyword("test2@gmail.com", "LOL", "cooking"))
  // console.log(await DAO.addKeyword("test2@gmail.com", "Jokes", "pets"))

  // console.log(await DAO.deleteSubreddit("test@gmail.com", "AskReddit"))
  // console.log(await DAO.deleteKeyword("test@gmail.com", "AskReddit", "cooking"))

  // console.log(await DAO.deleteSubreddit("test2@gmail.com", "AskReddit"))
  // console.log(await DAO.deleteKeyword("test2@gmail.com", "AskReddit", "cooking"))

  await checkReddit()
}

test()