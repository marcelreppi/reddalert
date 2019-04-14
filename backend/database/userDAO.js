const docClient = require("./db")

const TableName = `reddalert-users${
  process.env.NODE_ENV == "production" ? "" : "-dev"
}`

exports.saveUser = async (email, password) => {
  const params = {
    TableName,
    Item: {
      email,
      password,
    },
    ReturnValues: "ALL_OLD",
  }

  const data = await docClient.put(params).promise()
  return data
}

exports.getUser = async email => {
  const params = {
    TableName,
    // FilterExpression: "email = :userMail",
    // ExpressionAttributeValues: { ":userMail": email },
    Key: { email },
  }
  const data = await docClient.get(params).promise()
  return data.Item
}
