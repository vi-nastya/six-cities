import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {reducer, Operation} from "./reducer";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from "./api";

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__() ?
            window.__REDUX_DEVTOOLS_EXTENSION__() :
            (f) => f
      )
  );
  /* eslint-enable */
  store.dispatch(Operation.loadOffers()).then(() => {
    const offers = store.getState().offers;
    ReactDOM.render(
        <Provider store={store}>
          <App places={offers}/>
        </Provider>,
        document.getElementById(`root`)
    );
  });
};

init();
