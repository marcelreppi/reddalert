const AWS = require("aws-sdk")

const docClient = new AWS.DynamoDB.DocumentClient({
  region: "eu-central-1",
})

module.exports = docClient
