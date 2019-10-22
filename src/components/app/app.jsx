import React from "react";
import PropTypes from "prop-types";
import MainPage from '../main-page/main-page.jsx';

const App = (props) => {
  const placeNames = props.placeNames;
  return <MainPage placeNames={placeNames}/>;
};

App.propTypes = {
  placeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
