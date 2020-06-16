import { sdk } from "./sdk";

export const s3 = new sdk.S3(
  process.env.IS_OFFLINE
    ? {
        s3ForcePathStyle: true,
        endpoint: "http://localhost:12000",
        accessKeyId: "S3RVER",
        secretAccessKey: "S3RVER",
      }
    : { signatureVersion: "v4" }
);
