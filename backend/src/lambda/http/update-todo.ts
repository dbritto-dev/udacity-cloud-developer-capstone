import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import cors from "@middy/http-cors";

import { UpdateTodoRequest } from "../../requests/UpdateTodoRequest";
import { updateTodo } from "../data/todo";
import { httpErrorHandler } from "../../middy";
import schema from "../../schemas/update-todo-request.json";
import { createLogger } from "../../utils/logger";

const logger = createLogger("todo");

const updateTodoHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // DONE: Update a TODO item with the provided id using values in the "updatedTodo" object
  logger.info("Updating a todo", { todoId: event.pathParameters });

  try {
    // @ts-ignore
    const request: UpdateTodoRequest = event.body;
    await updateTodo(event, request);

    logger.info("Todo was updated successfully", { payload: request });

    return { statusCode: 204, body: null };
  } catch (e) {
    logger.error("Todo was not updated successfully", { error: e.message });

    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};

export const handler: APIGatewayProxyHandler = middy(updateTodoHandler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema: schema }))
  .use(httpErrorHandler())
  .use(cors());
