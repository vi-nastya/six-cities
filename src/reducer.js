import {convertApiToApp} from './utils';

const initialState = {
  city: {name: ``, location: {latitude: 0, longitude: 0}},
  offers: [],
  offersForCity: [],
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: `CHANGE_CITY`,
    payload: newCity
  }),
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
    case `LOAD_OFFERS`:
      const offersData = action.payload.map(convertApiToApp);
      return Object.assign({}, state, {
        offers: offersData,
        city: offersData[0].city, // TODO: replace with random city
      });
  }

  return state;
};

export {ActionCreator, Operation, reducer};

