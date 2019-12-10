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
  updateFavoriteStatus: (offerData) => ({
    type: `UPDATE_FAVORITE_STATUS`,
    payload: offerData,
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
  },
  updateFavoriteStatus: (offerData) => (dispatch, _getState, api) => {
    const newStatus = offerData.isFavorite ? 0 : 1;
    return api.post(`/favorite/` + offerData.id.toString() + `/` + newStatus.toString())
      .then((response) => {
        dispatch(ActionCreator.updateFavoriteStatus(response.data));
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
    case `REQUIRE_AUTHORIZATION`:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
    case `SAVE_USER`:
      return Object.assign({}, state, {
        user: action.payload,
      });
    case `UPDATE_FAVORITE_STATUS`:
      return Object.assign({}, state, {
        offers: [
          ...state.offers.slice(0, action.payload.id - 1),
          convertApiToApp(action.payload),
          ...state.offers.slice(action.payload.id)
        ]
      });
  }

  return state;
};

export {ActionCreator, Operation, reducer};

