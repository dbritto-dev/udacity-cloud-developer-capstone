import "source-map-support/register";
import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import cors from "@middy/http-cors";

import { CreateTodoRequest } from "../../requests/CreateTodoRequest";
import { createTodo } from "../data/todo";
import { httpErrorHandler } from "../../middy";
import schema from "../../schemas/create-todo-request.json";
import { createLogger } from "../../utils/logger";

const logger = createLogger("todo");

const createTodoHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // DONE: Implement creating a new TODO items
  logger.info("Creating a new todo");

  try {
    // @ts-ignore
    const request: CreateTodoRequest = event.body;
    // @ts-ignore
    const response: DynamoDB.DocumentClient.PutItemOutput = await createTodo(event, request);

    logger.info("Todo was created successfully", { payload: request });

    return { statusCode: 201, body: JSON.stringify({ item: request, test: "test" }) };
  } catch (e) {
    logger.error("Todo was not created successfully", { error: e.message });

    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};

export const handler: APIGatewayProxyHandler = middy(createTodoHandler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema: schema }))
  .use(httpErrorHandler())
  .use(cors());
