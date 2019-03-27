// Set environment variables
require("dotenv").config({ path: "variables.env" })

process.env.NODE_ENV = "dev" // Make sure dev environment is set

const { checkReddit } = require("../crawler")
const docClient = require("../database/db")
const subredditDAO = require("../database/subredditDAO")

const TableName = `reddalert-subreddits-dev`

async function deleteAllItems() {
  const res = await docClient
    .scan({
      TableName,
    })
    .promise()

  const x = 25 // Dynamo batchWrite limit
  for (let i = 0, len = Math.ceil(res.Items.length / x); i < len; i++) {
    const toBeDeleted = res.Items.splice(0, x)
    await docClient
      .batchWrite({
        RequestItems: {
          [TableName]: toBeDeleted.map(d => {
            return {
              DeleteRequest: {
                Key: {
                  email: d.email,
                  subreddit: d.subreddit,
                },
              },
            }
          }),
        },
      })
      .promise()
  }
}

async function getItem(email, subreddit) {
  const { Item } = await docClient
    .get({
      TableName,
      Key: { email, subreddit },
    })
    .promise()
  return Item
}

beforeAll(async () => await deleteAllItems())

test("Adding subreddit with one keyword", async () => {
  const item = {
    email: "test@gmail.com",
    subreddit: "askreddit",
    keywords: ["cats"],
  }
  await subredditDAO.addSubreddit(item.email, item.subreddit, item.keywords)
  const dbItem = await getItem(item.email, item.subreddit)
  expect(dbItem.email).toEqual(item.email)
  expect(dbItem.subreddit).toEqual(item.subreddit)
  expect(dbItem.keywords.values.length).toEqual(item.keywords.length)
  expect(dbItem.keywords.values).toContain(item.keywords[0])
})

test("Adding subreddit with two keywords", async () => {
  const item = {
    email: "test@gmail.com",
    subreddit: "jokes",
    keywords: ["mum", "dad"],
  }
  await subredditDAO.addSubreddit(item.email, item.subreddit, item.keywords)
  const dbItem = await getItem(item.email, item.subreddit)
  expect(dbItem.email).toEqual(item.email)
  expect(dbItem.subreddit).toEqual(item.subreddit)
  expect(dbItem.keywords.values.length).toEqual(item.keywords.length)
  expect(dbItem.keywords.values).toContain(item.keywords[0])
  expect(dbItem.keywords.values).toContain(item.keywords[1])
})

test("Adding subreddit with everything in ALL CAPS", async () => {
  const item = {
    email: "lol@gmail.com",
    subreddit: "askreddit",
    keywords: ["pets"],
  }
  await subredditDAO.addSubreddit(
    item.email.toUpperCase(),
    item.subreddit.toUpperCase(),
    item.keywords.map(k => k.toUpperCase())
  )
  const dbItem = await getItem(item.email, item.subreddit)
  expect(dbItem.email).toEqual(item.email)
  expect(dbItem.subreddit).toEqual(item.subreddit)
  expect(dbItem.keywords.values.length).toEqual(item.keywords.length)
  expect(dbItem.keywords.values).toContain(item.keywords[0])
})

test("Adding keyword", async () => {
  const item = {
    email: "lol@gmail.com",
    subreddit: "askreddit",
    keywords: ["relationship"],
  }
  await subredditDAO.addKeyword(item.email, item.subreddit, item.keywords[0])
  const dbItem = await getItem(item.email, item.subreddit)
  expect(dbItem.email).toEqual(item.email)
  expect(dbItem.subreddit).toEqual(item.subreddit)
  expect(dbItem.keywords.values.length).toEqual(item.keywords.length + 1)
  expect(dbItem.keywords.values).toContain(item.keywords[0])
})

test("Deleting keyword", async () => {
  const item = {
    email: "lol@gmail.com",
    subreddit: "askreddit",
    keywords: ["relationship"],
  }
  await subredditDAO.deleteKeyword(item.email, item.subreddit, item.keywords[0])
  const dbItem = await getItem(item.email, item.subreddit)
  expect(dbItem.email).toEqual(item.email)
  expect(dbItem.subreddit).toEqual(item.subreddit)
  expect(dbItem.keywords.values.length).toEqual(item.keywords.length)
  expect(dbItem.keywords.values).not.toContain(item.keywords[0])
})

test("Deleting subreddit", async () => {
  const item = {
    email: "lol@gmail.com",
    subreddit: "askreddit",
    keywords: ["relationship"],
  }
  await subredditDAO.deleteSubreddit(item.email, item.subreddit)
  const dbItem = await getItem(item.email, item.subreddit)
  expect(dbItem).toEqual(undefined)
})

test("Getting all user subreddits", async () => {
  const item = {
    email: "test@gmail.com",
    subreddit: "askreddit",
    keywords: ["cats"],
  }
  const result = await subredditDAO.getUserSubreddits(item.email)
  expect(result.length).toEqual(2)
  result.forEach(r => {
    expect(r.email).toEqual(item.email)
  })
})

afterAll(async () => await deleteAllItems())
