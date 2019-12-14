import PropTypes from "prop-types";

const PLACE_TYPES = [`apartment`, `room`, `house`, `hotel`];

const userPropTypes = PropTypes.shape({
  id: PropTypes.number,
  isPro: PropTypes.bool,
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
});

const locationPropTypes = PropTypes.shape({
  zoom: PropTypes.number,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
});

const cityPropTypes = PropTypes.shape({
  name: PropTypes.string,
  location: locationPropTypes,
});

const offerPropTypes = PropTypes.shape({
  id: PropTypes.number,
  city: cityPropTypes,
  previewImage: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  isFavorite: PropTypes.bool,
  isPremium: PropTypes.bool,
  rating: PropTypes.number,
  type: PropTypes.oneOf(PLACE_TYPES),
  bedrooms: PropTypes.number,
  maxAdults: PropTypes.number,
  price: PropTypes.number,
  goods: PropTypes.arrayOf(PropTypes.string),
  host: userPropTypes,
  description: PropTypes.string,
  location: locationPropTypes,
});

const reviewPropTypes = PropTypes.shape({
  id: PropTypes.number,
  user: userPropTypes,
  rating: PropTypes.number,
  comment: PropTypes.string,
  date: PropTypes.string
});

export {userPropTypes, offerPropTypes, cityPropTypes, reviewPropTypes};
