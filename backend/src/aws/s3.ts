import * as AWS from "aws-sdk";

export const s3 = new AWS.S3(
  process.env.IS_OFFLINE
    ? {
        s3ForcePathStyle: true,
        endpoint: "http://localhost:12000",
        accessKeyId: "S3RVER",
        secretAccessKey: "S3RVER",
      }
    : {}
);
