import React from "react";
import PropTypes from "prop-types";
import MainPage from '../main-page/main-page.jsx';

const App = (props) => {
  const places = props.places;
  return <MainPage places={places}/>;
};

App.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
