import "source-map-support/register";
import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import cors from "@middy/http-cors";

import { getTodos } from "../data/todo";
import { createLogger } from "../../utils/logger";

const logger = createLogger("todo");

const getTodosHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // DONE: Get all TODO items for a current user
  logger.info("Fetching todos");

  try {
    const response: DynamoDB.DocumentClient.QueryOutput = await getTodos(event);

    logger.info("Todos was fetched successfully");

    return { statusCode: 200, body: JSON.stringify({ items: response.Items }) };
  } catch (e) {
    logger.error("Todos was not fetched successfully", { error: e.message });

    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};

export const handler: APIGatewayProxyHandler = middy(getTodosHandler).use(cors());
