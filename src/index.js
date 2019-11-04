import React from "react";
import ReactDOM from "react-dom";
import App from './components/app/app.jsx';
import {offers} from './mocks/offers';

const init = () => {
  ReactDOM.render(
      <App places={offers}/>,
      document.getElementById(`root`)
  );
};

init();
