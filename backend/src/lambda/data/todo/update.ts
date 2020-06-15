import { APIGatewayProxyEvent } from "aws-lambda";

import { dynamodb } from "../../../aws";
import { UpdateTodoRequest } from "../../../requests/UpdateTodoRequest";
import { TodoItem } from "../../../models/TodoItem";
import { getUserId } from "../../../auth/utils";
import { createTodoItem } from "../../../utils/todo";
import { TABLE_NAME } from "./config";
import { DynamoDB } from "aws-sdk";

export const updateTodo = async (
  event: APIGatewayProxyEvent,
  request: UpdateTodoRequest
): Promise<DynamoDB.DocumentClient.UpdateItemOutput> => {
  const userId: string = getUserId(event);
  const { todoId = "" } = event.pathParameters;
  const todoItem: TodoItem = createTodoItem({ userId, request });

  return dynamodb
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
};
