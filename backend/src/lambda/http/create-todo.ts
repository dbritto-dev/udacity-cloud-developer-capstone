import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

import { dynamodb } from "../../aws";
import { getUserId } from "../../auth/utils";
import { CreateTodoRequest } from "../../requests/CreateTodoRequest";
import { TodoItem } from "../../models/TodoItem";
import { createTodoItem } from "../../utils/todo";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // DONE: Implement creating a new TODO item
  const TABLE_NAME = process.env.TODOS_TABLE_NAME;
  const userId = getUserId(event);
  const request: CreateTodoRequest = JSON.parse(event.body);
  const todoItem: TodoItem = createTodoItem({ userId, request });

  try {
    await dynamodb.put({ TableName: TABLE_NAME, Item: todoItem }).promise();
    return { statusCode: 201, body: JSON.stringify({ item: todoItem }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
