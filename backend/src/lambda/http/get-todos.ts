import "source-map-support/register";
import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { dynamodb } from "../../aws";
import { getUserId } from "../../auth/utils";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // DONE: Get all TODO items for a current user
  const userId = getUserId(event);

  try {
    const response: DynamoDB.DocumentClient.QueryOutput = await dynamodb
      .query({
        TableName: process.env.TODOS_TABLE_NAME,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": userId },
      })
      .promise();

    return { statusCode: 200, body: JSON.stringify({ items: response.Items }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
