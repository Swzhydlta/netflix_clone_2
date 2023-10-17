const AWS = require("aws-sdk");
require("dotenv").config();

// AWS.config.update({
//   region: "us-east-1",
// });

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "user";

const getUsers = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const users = await dynamoClient.scan(params).promise();
  console.log("users", users);
  return users;
};

const addOrUpdateUser = async (user) => {
  const params = {
    TableName: TABLE_NAME,
    Item: user,
  };
  return await dynamoClient.put(params).promise();
};

const findUserByEmail = async (email) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "email-index",
    KeyConditionExpression: "email = :e",
    ExpressionAttributeValues: {
      ":e": email,
    },
  };

  try {
    const user = await dynamoClient.query(params).promise();
    console.log("user", user);
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

const user = {
  id: "0",
  name: "test",
};

module.exports = {
  getUsers,
  addOrUpdateUser,
  findUserByEmail,
};
