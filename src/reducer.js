import {offers} from './mocks/offers';

const getOffersForCity = (offersList, city) => {
  return offersList.filter((offer) => offer.city === city);
};

const INITIAL_CITY = offers[0].city;

const initialState = {
  city: INITIAL_CITY,
  offers,
  offersForCity: getOffersForCity(offers, INITIAL_CITY),
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
        offersForCity: action.payload
      });
  }

  return state;
};

export {ActionCreator, reducer};

