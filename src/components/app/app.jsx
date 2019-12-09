import React from "react";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";
import MainPage from '../main-page/main-page.jsx';
import SignInForm from "../sign-in-form/sign-in-form.jsx";
import {Operation} from "../../reducer";

const App = (props) => {
  const {isAuthorizationRequired, login} = props;
  // if (isAuthorizationRequired) {
  //   return <SignInForm onFormSubmit={login}/>;
  // }
  // return <MainPage/>;
  return <Switch>
    <Route path="/" component={MainPage} exact />
    <Route path="/login" render={() => <SignInForm onFormSubmit={login}/>} exact />
  </Switch>;
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
