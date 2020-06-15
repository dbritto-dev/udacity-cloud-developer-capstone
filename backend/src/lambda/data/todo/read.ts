import { APIGatewayProxyEvent } from "aws-lambda";

import { dynamodb } from "../../../aws";
import { getUserId } from "../../../auth/utils";
import { TABLE_NAME } from "./config";
import { DynamoDB } from "aws-sdk";

export const getTodos = async (
  event: APIGatewayProxyEvent
): Promise<DynamoDB.DocumentClient.QueryOutput> => {
  const userId: string = getUserId(event);

  return await dynamodb
    .query({
      TableName: TABLE_NAME,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: { ":userId": userId },
    })
    .promise();
};
