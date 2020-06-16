import "source-map-support/register";
import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import middy from "@middy/core";
import cors from "@middy/http-cors";

import { deleteTodo } from "../data/todo";
import { createLogger } from "../../utils/logger";

const logger = createLogger("todo");

const deleteTodoHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // DONE: Remove a TODO item by id
  logger.info("Deleting a todo:", { todoId: event.pathParameters.todoId });

  try {
    // @ts-ignore
    const response: DynamoDB.DocumentClient.DeleteItemOutput = await deleteTodo(event);

    logger.info("Todo was deleted successfully");

    return { statusCode: 204, body: null };
  } catch (e) {
    logger.error("Todo was not deleted successfully", { error: e.message });

    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};

export const handler: APIGatewayProxyHandler = middy(deleteTodoHandler).use(cors());
