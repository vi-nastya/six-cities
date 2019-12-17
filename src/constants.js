import leaflet from "leaflet";
export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  UPDATE_FAVORITE_STATUS: `UPDATE_FAVORITE_STATUS`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  CHANGE_SORT: `CHANGE_SORT`,
  UPDATE_SENDING_REVIEW_STATUS: `UPDATE_SENDING_REVIEW_STATUS`,
  UPDATE_REVIEW_ERROR_STATUS: `UPDATE_REVIEW_ERROR_STATUS`,
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  SAVE_USER: `SAVE_USER`
};
export const RATING_LABELS = [`perfect`, `good`, `not bad`, `badly`, `terribly`];
export const MAX_RATING = 5;
export const RATING_PERCENT = 20;

export const MAX_NEARBY_PLACES = 3;

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export const SUCCESS_CODE = 200;
export const UNAUTH_CODE = 401;
export const BAD_REQUEST_CODE = 400;


export const PlaceCardType = {
  FAVORITE: {
    cardClass: `favorites__card`,
    imageClass: `favorites__image-wrapper`
  },
  MAIN_PAGE: {
    cardClass: `cities__place-card`,
    imageClass: `cities__image-wrapper`
  },
  NEARBY: {
    cardClass: `near-places__card`,
    imageClass: `near-places__image-wrapper`
  }
};

export const SORT_TYPES = [
  {
    name: `DEFAULT`,
    text: `Popular`
  },
  {
    name: `PRICE_ASC`,
    text: `Price: low to high`
  },
  {
    name: `PRICE_DESC`,
    text: `Price: high to low`
  },
  {
    name: `RATING`,
    text: `Top rated first`
  },
];

export const MAP_ZOOM = 12;
export const MAP_ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});
export const MAP_ICON_ACTIVE = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [30, 30]
});
