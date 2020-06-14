import Axios from "axios";
import { JwtHeader, decode, verify } from "jsonwebtoken";
import { APIGatewayProxyEvent } from "aws-lambda";

/**
 * A payload of a JWT token
 */
export interface JwtPayload {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
}

/**
 * Interface representing a JWT token
 */
export interface Jwt {
  header: JwtHeader;
  payload: JwtPayload;
}

/**
 * Interface representing JSON Web Key
 * A JSON object that represents a cryptographic key. The members of the object
 * represent properties of the key, including its value.
 */
export interface Jwk {
  alg: string;
  kty: string;
  use: string;
  x5c: Array<string>;
  n: string;
  e: string;
  kid: string;
  x5t: string;
}

/**
 * Interface representing JSON Web Key Set
 * A JSON object that represents a set of JWKs. The JSON object MUST have a keys
 * member, which is an array of JWKs.
 */
export interface Jwks {
  keys: Array<Jwk>;
}

// DONE: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
const jwksUrl = process.env.JWKS_ENDPOINT;

/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseUserId(jwtToken: string): string {
  const { sub } = decode(jwtToken) as JwtPayload;
  return sub;
}

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */
export function getUserId(event: APIGatewayProxyEvent): string {
  const authHeader = event.headers.Authorization;
  const token = getToken(authHeader);
  return parseUserId(token);
}

export function getToken(authHeader: string): string {
  if (!authHeader) throw new Error("No authentication header");

  const parts = authHeader.split(" ");

  if (parts.length !== 2) throw new Error("No authorization token was found");

  const [schema, token] = parts;

  if (!/^bearer$/i.test(schema)) throw new Error("Invalid authorization header");

  if (!token.length) throw new Error("No authorization token was found");

  return token;
}

export function certToPEM(cert) {
  if (/-----BEGIN CERTIFICATE-----/.test(cert)) return cert;
  // prettier-ignore
  return `-----BEGIN CERTIFICATE-----\n${cert.match(/.{1,64}/g).join("\n")}\n-----END CERTIFICATE-----\n`;
}

export async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader);
  const jwt: Jwt = decode(token, { complete: true }) as Jwt;

  // DONE: Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
  if (jwt.header.alg !== "RS256") {
    throw new Error("Only support RS256 algorithm.");
  }

  const kid = jwt.header.kid;
  const jwks: Jwks = await Axios.get(jwksUrl).then(({ data }: { data: Jwks }) => data);
  const signingKey: Jwk | undefined = jwks.keys.find(key => key.kid === kid);

  if (!signingKey) {
    throw new Error(`Unable to find a signing key that matches '${kid}`);
  }

  const publicKey: string = certToPEM(signingKey.x5c[0]);

  return verify(token, publicKey) as JwtPayload;
}
