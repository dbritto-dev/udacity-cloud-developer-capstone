import { AWS } from "./aws";

export const dynamodb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE ? { endpoint: "http://localhost:8000" } : {}
);
