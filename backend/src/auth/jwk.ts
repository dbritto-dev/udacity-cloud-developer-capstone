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
