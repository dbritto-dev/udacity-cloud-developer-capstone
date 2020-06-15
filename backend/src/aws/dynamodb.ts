import { sdk } from "./sdk";

export const dynamodb = new sdk.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE ? { endpoint: "http://localhost:10000" } : {}
);
