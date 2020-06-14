import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";

import { dynamodb } from "../../aws";
import { getUserId } from "../../auth/utils";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // DONE: Remove a TODO item by id
  const TABLE_NAME = process.env.TODOS_TABLE_NAME;
  const userId = getUserId(event);
  const { todoId = "" } = event.pathParameters;

  try {
    await dynamodb
      .delete({
        TableName: TABLE_NAME,
        Key: { userId, todoId },
        ConditionExpression: "attribute_exists(todoId)",
      })
      .promise();
    return { statusCode: 204, body: null };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
