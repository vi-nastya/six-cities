import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MainPage from '../main-page/main-page.jsx';
import SignInScreen from "../sign-in/sign-in.jsx";

const App = (props) => {
  const {isAuthorizationRequired} = props;
  if (isAuthorizationRequired) {
    return <SignInScreen/>;
  }
  return <MainPage/>;
};

App.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: state.isAuthorizationRequired,
});

export {App};

export default connect(mapStateToProps)(App);
