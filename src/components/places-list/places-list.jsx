import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

export default class PlacesList extends PureComponent {
  constructor() {
    super();

    this.state = {
      activePlace: -1
    };
  }

  render() {
    const places = this.props.places;

    return <div className="cities__places-list places__list tabs__content">
                ${places.map((place, index) => <PlaceCard placeName={place} onNameClick={onPlaceNameClick} key={index} />)}
    </div>;
  }
}

PlacesList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
};

