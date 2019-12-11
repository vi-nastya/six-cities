import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

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
                ${places.map((place, index) => <PlaceCard
        place={place}
        cardClass={`cities__place-card`}
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
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

export default PlacesList;
