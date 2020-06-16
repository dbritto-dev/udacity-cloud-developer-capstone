import { APIGatewayProxyEvent } from "aws-lambda";

import { s3 } from "../../../aws";

export const getPutSignedUrl = async (event: APIGatewayProxyEvent) => {
  const ATTACHMENT_STORAGE = process.env.ATTACHMENT_STORAGE;
  const SIGNED_URL_EXPIRE_SECONDS = 60 * 5;
  const { todoId = "" } = event.pathParameters;

  return s3.getSignedUrlPromise("putObject", {
    Bucket: ATTACHMENT_STORAGE,
    Key: todoId,
    Expires: SIGNED_URL_EXPIRE_SECONDS,
  });
};
