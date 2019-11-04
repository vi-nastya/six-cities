import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

const PlacesList = (props) => {
  const places = props.places;

  return <div className="cities__places-list places__list tabs__content">
                ${places.map((place, index) => <PlaceCard placeName={place} onNameClick={onPlaceNameClick} key={index} />)}
  </div>;
};

PlacesList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlacesList;
