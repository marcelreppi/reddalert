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

exports.getUserByEmail = async email => {
  const params = {
    TableName,
    // FilterExpression: "email = :userMail",
    // ExpressionAttributeValues: { ":userMail": email },
    Key: { email },
  }
  const data = await docClient.get(params).promise()
  return data.Item
}

exports.getUserBySessionId = async sessionId => {
  const params = {
    TableName,
    FilterExpression: "sessionId = :sessionId",
    ExpressionAttributeValues: { ":sessionId": sessionId },
  }
  const data = await docClient.scan(params).promise()
  return data.Items[0]
}

exports.saveSession = async (email, sessionId) => {
  const params = {
    TableName,
    Key: {
      email,
    },
    UpdateExpression: "SET sessionId = :newSessionId",
    ExpressionAttributeValues: {
      ":newSessionId": sessionId,
    },
    ReturnValues: "UPDATED_NEW",
  }

  return await docClient.update(params).promise()
}

exports.deleteSession = async sessionId => {
  const user = await this.getUserBySessionId(sessionId)

  const params = {
    TableName,
    Key: {
      email: user.email,
    },
    UpdateExpression: "REMOVE sessionId",
    ReturnValues: "UPDATED_NEW",
  }

  return await docClient.update(params).promise()
}
