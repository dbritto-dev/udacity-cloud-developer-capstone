import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";

import { dynamodb } from "../../../aws";
import { getUserId } from "../../../auth/utils";
import { TABLE_NAME } from "./config";

export const deleteTodo = async (
  event: APIGatewayProxyEvent
): Promise<DynamoDB.DocumentClient.DeleteItemOutput> => {
  const userId: string = getUserId(event);
  const { todoId = "" } = event.pathParameters;

  return await dynamodb
    .delete({
      TableName: TABLE_NAME,
      Key: { userId, todoId },
      ConditionExpression: "attribute_exists(todoId)",
    })
    .promise();
};
