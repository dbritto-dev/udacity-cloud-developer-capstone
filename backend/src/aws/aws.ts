import * as AWS from "aws-sdk";

AWS.config.credentials = new AWS.SharedIniFileCredentials({
  profile: process.env.AWS_PROFILE || "default",
});

export { AWS };
