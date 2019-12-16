import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./components/app/app.jsx";
import reducer from "./reducer/reducer";
import {UserOperation, UserActionCreator} from "./reducer/user-reducer/user-reducer";
import {DataOperation} from "./reducer/data-reducer/data-reducer";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from "./api";

const init = () => {
  const api = createAPI(() => {
    store.dispatch(UserActionCreator.requireAuthorization(true));
    store.dispatch(UserActionCreator.saveUser(null));
  });
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );
  /* eslint-enable */
  store.dispatch(DataOperation.loadOffers());
  store.dispatch(UserOperation.checkAuth());

  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
