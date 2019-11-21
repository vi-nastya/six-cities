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
      // getActiveItem,
      setActiveItem
    } = this.props;

    return <div className="cities__places-list places__list tabs__content">
                ${places.map((place, index) => <PlaceCard
        place={place}
        onHover={() => {
          setActiveItem(index);
        }}
        // isActive={getActiveItem() === index}
        key={index} />)}
    </div>;
  }
}

PlacesList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActiveItem: PropTypes.func.isRequired,
  // getActiveItem: PropTypes.func.isRequired,
};

export default PlacesList;
