import {convertApiToApp} from './utils';

const initialState = {
  city: {name: ``, location: {latitude: 0, longitude: 0}},
  offers: [],
  offersForCity: [],
  isAuthorizationRequired: true,
  user: null,
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: `CHANGE_CITY`,
    payload: newCity
  }),
  loadOffers: (offers) => ({
    type: `LOAD_OFFERS`,
    payload: offers,
  }),
  requireAuthorization: (flag) => ({
    type: `REQUIRE_AUTHORIZATION`,
    payload: flag,
  }),
  saveUser: (userData) => ({
    type: `SAVE_USER`,
    payload: userData,
  }),
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
      });
  },
  login: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, {email, password})
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(false));
        dispatch(ActionCreator.saveUser(response.data));
      });
  }
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
    case `REQUIRE_AUTHORIZATION`:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
    case `SAVE_USER`:
      return Object.assign({}, state, {
        user: action.payload,
      });
  }

  return state;
};

export {ActionCreator, Operation, reducer};

