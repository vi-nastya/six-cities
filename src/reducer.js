import {convertApiToApp} from './utils';

const getOffersForCity = (offersList, city) => {
  return offersList.filter((offer) => offer.city.name === city.name);
};

const initialState = {
  city: null,
  offers: [],
  offersForCity: [],
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
  },
  loadOffers: (offers) => {
    return {
      type: `LOAD_OFFERS`,
      payload: offers,
    };
  }
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
      });
  },
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
    case `LOAD_OFFERS`:
      const offersData = action.payload.map(convertApiToApp);
      return Object.assign({}, state, {
        offers: offersData,
        city: offersData[0].city, // TODO: replace with random city
        offersForCity: getOffersForCity(offersData, offersData[0].city)
      });
  }

  return state;
};

export {ActionCreator, Operation, reducer, getOffersForCity};

