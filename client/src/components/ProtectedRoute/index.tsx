import React from 'react';
import { withAuthenticationRequired, WithAuthenticationRequiredOptions } from '@auth0/auth0-react';
import { Route, RouteProps } from 'react-router-dom';

export const ProtectedRoute = ({
  component,
  returnTo,
  onRedirecting,
  loginOptions,
  ...args
}: React.PropsWithChildren<RouteProps & WithAuthenticationRequiredOptions>) => (
  <Route
    component={withAuthenticationRequired(component as React.ComponentType, {
      // If using a Hash Router, you need to pass the hash fragment as `returnTo`
      // returnTo: () => window.location.hash.substr(1),
      returnTo,
      onRedirecting,
      loginOptions,
    })}
    {...args}
  />
);
