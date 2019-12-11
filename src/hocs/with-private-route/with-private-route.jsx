import React from "react";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

const withPrivateRoute = (Component) => {
  const WithPrivateRoute = (props) => {
    const {isAuthenticated, redirectRoute} = props;
    return isAuthenticated ? <Component {...props}/> : <Redirect to={redirectRoute}/>;
  };

  WithPrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    redirectRoute: PropTypes.string.isRequired,
  };

  return WithPrivateRoute;
};

export default withPrivateRoute;
