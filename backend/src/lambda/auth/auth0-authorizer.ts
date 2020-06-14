import Axios from "axios";
import { CustomAuthorizerEvent, CustomAuthorizerResult } from "aws-lambda";
import "source-map-support/register";

import { verify, decode } from "jsonwebtoken";
import { createLogger } from "../../utils/logger";
import { Jwt } from "../../auth/Jwt";
import { Jwks } from "../../auth/jwks";
import { Jwk } from "../../auth/jwk";
import { JwtPayload } from "../../auth/JwtPayload";

const logger = createLogger("auth");

// DONE: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
const jwksUrl = "https://udacity-serverless-todo.us.auth0.com/.well-known/jwks.json";

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  logger.info("Authorizing a user", event.authorizationToken);

  try {
    const jwtToken = await verifyToken(event.authorizationToken);

    logger.info("User was authorized", jwtToken);

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: "*",
          },
        ],
      },
    };
  } catch (e) {
    logger.error("User not authorized", { error: e.message });

    return {
      principalId: "user",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Deny",
            Resource: "*",
          },
        ],
      },
    };
  }
};

function certToPEM(cert) {
  if (/-----BEGIN CERTIFICATE-----/.test(cert)) return cert;
  // prettier-ignore
  return `-----BEGIN CERTIFICATE-----\n${cert.match(/.{1,64}/g).join("\n")}\n-----END CERTIFICATE-----\n`;
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader);
  const jwt: Jwt = decode(token, { complete: true }) as Jwt;

  // DONE: Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
  if (jwt.header.alg !== "RS256") {
    throw new Error("Only support RS256 algorithm.");
  }

  const kid = jwt.header.kid;
  const jwks: Jwks = await Axios.get(jwksUrl).then(({ data }) => data);
  const signingKey: Jwk | undefined = jwks.keys.find(key => key.kid === kid);

  if (!signingKey) {
    throw new Error(`Unable to find a signing key that matches '${kid}`);
  }

  const publicKey: Buffer = certToPEM(signingKey.x5c[0]);

  return verify(token, publicKey) as JwtPayload;
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error("No authentication header");

  const parts = authHeader.split(" ");

  if (parts.length !== 2) throw new Error("No authorization token was found");

  const [schema, token] = parts;

  if (!/^bearer$/i.test(schema)) throw new Error("Invalid authorization header");

  if (!token.length) throw new Error("No authorization token was found");

  return token;
}
