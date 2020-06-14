// import dotenv from 'dotenv'
// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
// const apiId = '...'
// export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`
// dotenv.config()

export const apiEndpoint = process.env.REACT_APP_API_ENDPOINT

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: process.env.REACT_APP_AUTH0_DOMAIN, // Auth0 domain
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID, // Auth0 client id
  callbackUrl: process.env.REACT_APP_AUTH0_CALLBACK_URL
}
