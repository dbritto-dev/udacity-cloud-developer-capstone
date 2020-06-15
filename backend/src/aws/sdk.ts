import * as AWS from "aws-sdk";
import * as Xray from "aws-xray-sdk-core";

export const sdk = process.env.IS_OFFLINE ? AWS : Xray.captureAWS(AWS);
