import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors } from "middy/middlewares";

import { dynamodb } from "../../aws";
import { UpdateTodoRequest } from "../../requests/UpdateTodoRequest";
import { createTodoItem } from "../../utils/todo";
import { getUserId } from "../../auth/utils";

const updateTodo: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // DONE: Update a TODO item with the provided id using values in the "updatedTodo" object
  const TABLE_NAME = process.env.TODOS_TABLE_NAME;
  const userId = getUserId(event);
  const { todoId = "" } = event.pathParameters;

  try {
    const request: UpdateTodoRequest = JSON.parse(event.body);
    const todoItem = createTodoItem({ userId, request });

    await dynamodb
      .update({
        TableName: TABLE_NAME,
        Key: { userId, todoId },
        UpdateExpression: "SET #name = :name, dueDate = :dueDate, done = :done",
        ExpressionAttributeNames: { "#name": todoItem.name },
        ExpressionAttributeValues: Object.entries(request).reduce<Object>(
          (output, [key, value]) => ({ ...output, [`:${key}`]: value }),
          {}
        ),
      })
      .promise();

    return { statusCode: 204, body: null };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};

export const handler: APIGatewayProxyHandler = middy(updateTodo).use(cors());
