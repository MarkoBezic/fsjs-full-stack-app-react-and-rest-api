import React from "react";
import { Redirect, Route } from "react-router";
import { Consumer } from "../Context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {(context) => (
        <Route
          {...rest}
          render={(props) =>
            context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
      )}
    </Consumer>
  );
};

export default PrivateRoute;
