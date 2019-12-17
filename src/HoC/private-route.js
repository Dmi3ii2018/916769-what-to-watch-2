import React from 'react'

export const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
