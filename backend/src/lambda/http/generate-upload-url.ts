import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";

import { s3 } from "../../aws";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // DONE: Return a presigned URL to upload a file for a TODO item with the provided id
  const SIGNED_URL_EXPIRE_SECONDS = 60 * 5;
  const ATTACHMENT_STORAGE = process.env.ATTACHMENT_STORAGE;
  const { todoId = "" } = event.pathParameters;

  try {
    const uploadUrl = await s3.getSignedUrlPromise("putObject", {
      Bucket: ATTACHMENT_STORAGE,
      Key: todoId,
      Expires: SIGNED_URL_EXPIRE_SECONDS,
    });

    return { statusCode: 200, body: JSON.stringify({ uploadUrl }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
