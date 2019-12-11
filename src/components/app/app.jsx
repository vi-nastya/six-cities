import React from "react";
import {connect} from "react-redux";
import {Switch, Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import MainPage from '../main-page/main-page.jsx';
import SignInForm from "../sign-in-form/sign-in-form.jsx";
import PlaceDetails from "../place-details/place-details.jsx";
import FavoritesList from "../favorites-list/favorites-list.jsx";
import {Operation} from "../../reducer";
import withPrivateRoute from "../../hocs/with-private-route/with-private-route.jsx";

const App = (props) => {
  const {isAuthorizationRequired, login} = props;
  const FavoritesListWrapped = withPrivateRoute(FavoritesList, isAuthorizationRequired, `/login`);
  return <React.Fragment>
    {!isAuthorizationRequired && <Redirect to="/" from="/login"/>}
    <Switch>
      <Route path="/" component={MainPage} exact />
      <Route path="/login" render={() => <SignInForm onFormSubmit={login}/>} exact />
      <Route path="/offer/:id" component={PlaceDetails} exact />
      <Route path="/favorites" component={FavoritesListWrapped} exact />
    </Switch>
  </React.Fragment>;
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
