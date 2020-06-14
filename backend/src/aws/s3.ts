import { AWS, IS_OFFLINE } from "./aws";

export const s3 = new AWS.S3(
  IS_OFFLINE
    ? {
        s3ForcePathStyle: true,
        endpoint: "http://localhost:12000",
        accessKeyId: "S3RVER",
        secretAccessKey: "S3RVER",
      }
    : {}
);
