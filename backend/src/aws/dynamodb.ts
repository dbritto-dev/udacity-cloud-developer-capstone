import * as AWS from "aws-sdk";

export const dynamodb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE ? { endpoint: "http://localhost:10000" } : {}
);
