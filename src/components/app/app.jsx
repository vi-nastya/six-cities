import React from "react";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";
import MainPage from '../main-page/main-page.jsx';
import SignInForm from "../sign-in-form/sign-in-form.jsx";
import PlaceDetails from "../place-details/place-details.jsx";
import FavoritesList from "../favorites-list/favorites-list.jsx";
import {UserOperation} from "../../reducer/user-reducer/user-reducer";
import withPrivateRoute from "../../hocs/with-private-route/with-private-route.jsx";

const App = (props) => {
  const {isAuthorizationRequired, onLogin} = props;
  const FavoritesListWrapped = withPrivateRoute(FavoritesList);
  const SignInFormWrapped = withPrivateRoute(SignInForm);
  return <React.Fragment>
    <Switch>
      <Route path="/" component={MainPage} exact />
      <Route path="/login" render={() => <SignInFormWrapped onFormSubmit={onLogin} hasAccess={isAuthorizationRequired} redirectRoute="/"/>} exact />
      <Route path="/offer/:id" component={PlaceDetails} exact />
      <Route path="/favorites" render={() => <FavoritesListWrapped hasAccess={!isAuthorizationRequired} redirectRoute="/login"/>} exact />
    </Switch>
  </React.Fragment>;
};

App.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: state.user.isAuthorizationRequired,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (email, password) => {
    dispatch(UserOperation.login(email, password));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
