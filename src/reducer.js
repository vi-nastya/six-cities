import {offers} from './mocks';

const initialState = {
  city: `Amsterdam`,
  offers: {offers},
};

const getOffersForCity = (offersList, city) => {
  return offersList.filter((offer) => offer.city === city);
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: `CHANGE_CITY`,
    payload: newCity
  }),
  getOffers: (offersList, city) => {
    const offersForCity = getOffersForCity(offersList, city);
    return {
      type: `GET_OFFERS`,
      payload: offersForCity
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`:
      return Object.assign({}, state, {
        city: action.payload
      });
    case `GET_OFFERS`:
      return Object.assign({}, state, {
        offers: action.payload
      });
  }

  return state;
};

export {ActionCreator, reducer};

