import {convertApiToApp, convertCommentApiToApp} from './utils';

const initialState = {
  city: {name: ``, location: {latitude: 0, longitude: 0}},
  offers: [],
  offersForCity: [],
  isAuthorizationRequired: true,
  user: null,
  comments: [],
  favoriteOffers: [],
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
  loadComments: (commentsData) => ({
    type: `LOAD_COMMENTS`,
    payload: commentsData,
  }),
  loadFavorites: (favoritesData) => ({
    type: `LOAD_FAVORITES`,
    payload: favoritesData,
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
  loadComments: (offerId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${offerId}`)
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data));
      });
  },
  loadFavorites: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavorites(response.data));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`:
      return Object.assign({}, state, {
        city: action.payload
      });
    case `LOAD_OFFERS`: {
      const offersData = action.payload.map(convertApiToApp);
      return Object.assign({}, state, {
        offers: offersData,
        city: offersData[0].city, // TODO: replace with random city
      });
    }
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
    case `LOAD_COMMENTS`:
      return Object.assign({}, state, {
        comments: action.payload.map(convertCommentApiToApp),
      });
    case `LOAD_FAVORITES`: {
      const formattedFavoritesData = action.payload.map(convertApiToApp);
      return Object.assign({}, state, {
        favoriteOffers: formattedFavoritesData
      });
    }
  }

  return state;
};

export {ActionCreator, Operation, reducer};

