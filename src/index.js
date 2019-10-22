import React from "react";
import ReactDOM from "react-dom";
import App from './components/app/app.jsx';

const PLACE_NAMES = [`Wood and stone place`, `Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`, `Beautiful &amp; luxurious apartment at great location`];

const init = () => {
  ReactDOM.render(
      <App placeNames={PLACE_NAMES}/>,
      document.getElementById(`root`)
  );
};

init();
