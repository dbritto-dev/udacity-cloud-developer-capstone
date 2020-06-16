import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import middy from "@middy/core";
import cors from "@middy/http-cors";

import { createLogger } from "../../utils/logger";
import { getPutSignedUrl } from "../service/s3";

const logger = createLogger("signed-upload-url");

const generateUploadURL: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // DONE: Return a presigned URL to upload a file for a TODO item with the provided id
  logger.info("Generating signed upload url", { todoId: event.pathParameters.todoId });

  try {
    const response: string = await getPutSignedUrl(event);

    logger.info("Signed upload url was generated successfully.");

    return { statusCode: 200, body: JSON.stringify({ uploadUrl: response }) };
  } catch (e) {
    logger.error("Signed upload url was not generated successfully.", { error: e.message });

    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};

export const handler: APIGatewayProxyHandler = middy(generateUploadURL).use(cors());
