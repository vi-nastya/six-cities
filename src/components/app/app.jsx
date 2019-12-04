import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MainPage from '../main-page/main-page.jsx';
import SignInScreen from "../sign-in/sign-in.jsx";
import {Operation} from "../../reducer";

const App = (props) => {
  const {isAuthorizationRequired, login} = props;
  if (isAuthorizationRequired) {
    return <SignInScreen loginHandler={login}/>;
  }
  return <MainPage/>;
};

App.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: state.isAuthorizationRequired,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => {
    dispatch(Operation.login(email, password));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
