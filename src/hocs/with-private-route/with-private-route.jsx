import React from "react";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

const withPrivateRoute = (Component) => {
  const WithPrivateRoute = (props) => {
    const {hasAccess, redirectRoute} = props;
    return hasAccess ? <Component {...props}/> : <Redirect to={redirectRoute}/>;
  };

  WithPrivateRoute.propTypes = {
    hasAccess: PropTypes.bool.isRequired,
    redirectRoute: PropTypes.string.isRequired,
  };

  return WithPrivateRoute;
};

export default withPrivateRoute;
