import React from "react";
import ReactDOM from "react-dom";
import { Amplify } from "aws-amplify";

import config from "./config";
import App from "./App";

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "cupido-online",
        endpoint: config.apiGateway.ULR,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

ReactDOM.render(<App />, document.getElementById("root"));
