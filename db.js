const AWS = require("aws-sdk")

const docClient = new AWS.DynamoDB.DocumentClient({
  region: "eu-central-1"
})

exports.getUserData = async function(email) {
  params = {
    TableName: "reddalert-subreddits",
    FilterExpression : "email = :userMail",
    ExpressionAttributeValues : { ":userMail" : email }
  }
  const data = await docClient.scan(params).promise()
  return data.Items
}

exports.addSubreddit = async function(email, subreddit, keywords = []) {
  const params = {
    TableName: "reddalert-subreddits",
    Item: {
      email,
      subreddit,
      // keywords: docClient.createSet(keywords)
    },
    ReturnValues: "ALL_OLD"
  }

  const data = await docClient.put(params).promise()
  return data
}

exports.addKeyword = async function(email, subreddit, keyword) {
  const params = {
    TableName: "reddalert-subreddits",
    Key: {
      email,
      subreddit
    },
    UpdateExpression: "ADD keywords :newKeyword",
    ExpressionAttributeValues: {
      ":newKeyword": docClient.createSet([keyword])
    },
    ReturnValues: "UPDATED_NEW"
  }

  const data = await docClient.update(params).promise()
  return data
}

exports.deleteSubreddit = async function(email, subreddit) {
  const params = {
    TableName: "reddalert-subreddits",
    Key: {
      email,
      subreddit
    },
  }
  const data = await docClient.delete(params).promise()
  return data
}

exports.deleteKeyword = async function(email, subreddit, keyword) {
  const params = {
    TableName: "reddalert-subreddits",
    Key: {
      email,
      subreddit
    },
    UpdateExpression: "DELETE keywords :deleteKeyword",
    ExpressionAttributeValues: {
      ":deleteKeyword": docClient.createSet([keyword])
    },
    ReturnValues: "UPDATED_NEW"
  }

  const data = await docClient.update(params).promise()
  return data
}