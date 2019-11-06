import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

class PlacesList extends PureComponent {
  constructor() {
    super();

    this.state = {
      activePlace: null
    };
  }

  render() {
    const {places} = this.props;

    return <div className="cities__places-list places__list tabs__content">
                ${places.map((place, index) => <PlaceCard place={place} onHover={() => {
        this.setState({activePlace: place});
      }} key={index} />)}
    </div>;
  }
}

PlacesList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlacesList;
