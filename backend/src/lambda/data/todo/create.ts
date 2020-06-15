import { APIGatewayProxyEvent } from "aws-lambda";

import { dynamodb } from "../../../aws";
import { CreateTodoRequest } from "../../../requests/CreateTodoRequest";
import { TodoItem } from "../../../models/TodoItem";
import { getUserId } from "../../../auth/utils";
import { createTodoItem } from "../../../utils/todo";
import { TABLE_NAME } from "./config";
import { DynamoDB } from "aws-sdk";

export const createTodo = async (
  event: APIGatewayProxyEvent,
  request: CreateTodoRequest
): Promise<DynamoDB.DocumentClient.PutItemOutput> => {
  const userId: string = getUserId(event);
  const todoItem: TodoItem = createTodoItem({ userId, request });

  return await dynamodb.put({ TableName: TABLE_NAME, Item: todoItem }).promise();
};
