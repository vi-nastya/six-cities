export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  UPDATE_FAVORITE_STATUS: `UPDATE_FAVORITE_STATUS`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  CHANGE_SORT: `CHANGE_SORT`,
  UPDATE_SENDING_REVIEW_STATUS: `UPDATE_SENDING_REVIEW_STATUS`,
  UPDATE_REVIEW_ERROR_STATUS: `UPDATE_REVIEW_ERROR_STATUS`,
};

export const MAX_RATING = 5;

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

