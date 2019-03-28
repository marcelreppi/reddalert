const docClient = require("./db")

const TableName = `reddalert-subreddits${
  process.env.NODE_ENV == "production" ? "" : "-dev"
}`

const valueMapper = item => {
  return {
    email: item.email,
    subreddit: item.subreddit,
    keywords: item.keywords.values,
  }
}

exports.getUserSubreddits = async function(email) {
  email = email.toLowerCase()
  const params = {
    TableName,
    FilterExpression: "email = :userMail",
    ExpressionAttributeValues: { ":userMail": email },
  }
  const data = await docClient.scan(params).promise()
  return data.Items.map(valueMapper)
}

exports.getAllSubreddits = async function() {
  const params = {
    TableName,
  }
  const data = await docClient.scan(params).promise()
  return data.Items.map(valueMapper)
}

exports.addSubreddit = async function(email, subreddit, keywords) {
  email = email.toLowerCase()
  subreddit = subreddit.toLowerCase()
  keywords = keywords.map(kw => kw.toLowerCase())
  const params = {
    TableName,
    Item: {
      email,
      subreddit,
      keywords: docClient.createSet(keywords),
    },
    ReturnValues: "ALL_OLD",
  }

  const data = await docClient.put(params).promise()
  return data
}

exports.addKeyword = async function(email, subreddit, keyword) {
  email = email.toLowerCase()
  subreddit = subreddit.toLowerCase()
  keyword = keyword.toLowerCase()
  const params = {
    TableName,
    Key: {
      email,
      subreddit,
    },
    UpdateExpression: "ADD keywords :newKeyword",
    ExpressionAttributeValues: {
      ":newKeyword": docClient.createSet([keyword]),
    },
    ReturnValues: "UPDATED_NEW",
  }

  const data = await docClient.update(params).promise()
  return data
}

exports.deleteSubreddit = async function(email, subreddit) {
  email = email.toLowerCase()
  subreddit = subreddit.toLowerCase()
  const params = {
    TableName,
    Key: {
      email,
      subreddit,
    },
  }
  const data = await docClient.delete(params).promise()
  return data
}

exports.deleteKeyword = async function(email, subreddit, keyword) {
  email = email.toLowerCase()
  subreddit = subreddit.toLowerCase()
  keyword = keyword.toLowerCase()
  const params = {
    TableName,
    Key: {
      email,
      subreddit,
    },
    UpdateExpression: "DELETE keywords :deleteKeyword",
    ExpressionAttributeValues: {
      ":deleteKeyword": docClient.createSet([keyword]),
    },
    ReturnValues: "UPDATED_NEW",
  }

  const data = await docClient.update(params).promise()
  return data
}
