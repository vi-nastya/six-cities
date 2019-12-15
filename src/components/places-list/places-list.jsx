import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {offerPropTypes} from "../../props-types-validation";
import PlaceCard from "../place-card/place-card.jsx";
import {PlaceCardType} from "../../constants";

class PlacesList extends PureComponent {
  constructor() {
    super();
  }

  render() {
    const {
      places,
      setActiveItem
    } = this.props;

    return <div className="cities__places-list places__list tabs__content">
      {places.map((place, index) => <PlaceCard
        place={place}
        cardType={PlaceCardType.MAIN_PAGE}
        onHoverOn={() => {
          setActiveItem(index);
        }}
        onHoverOff={() => {
          setActiveItem(-1);
        }}
        key={index} />)}
    </div>;
  }
}

PlacesList.propTypes = {
  places: PropTypes.arrayOf(offerPropTypes).isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

export default PlacesList;
