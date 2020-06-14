import { AWS, IS_OFFLINE } from "./aws";

export const dynamodb = new AWS.DynamoDB.DocumentClient(
  IS_OFFLINE ? { endpoint: "http://localhost:10000" } : {}
);
