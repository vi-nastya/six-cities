import {convertApiToApp, convertCommentApiToApp} from '../../utils';

import {SORT_TYPES} from "../../components/sorting/sorting.jsx";

const SUCCESS_STATUS = 200;

const initialState = {
  city: {name: ``, location: {latitude: 0, longitude: 0}},
  offers: [],
  offersForCity: [],
  comments: [],
  favoriteOffers: [],
  sortType: SORT_TYPES[0],
};

const DataActionCreator = {
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
  loadComments: (commentsData) => ({
    type: `LOAD_COMMENTS`,
    payload: commentsData,
  }),
  loadFavorites: (favoritesData) => ({
    type: `LOAD_FAVORITES`,
    payload: favoritesData,
  }),
  changeSortType: (sortType) => ({
    type: `CHANGE_SORT`,
    payload: sortType,
  }),
};

const DataOperation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(DataActionCreator.loadOffers(response.data));
      });
  },
  updateFavoriteStatus: (offerData) => (dispatch, _getState, api) => {
    const newStatus = offerData.isFavorite ? 0 : 1;
    return api.post(`/favorite/` + offerData.id.toString() + `/` + newStatus.toString())
      .then((response) => {
        dispatch(DataActionCreator.updateFavoriteStatus(response.data));
      });
  },
  loadComments: (offerId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${offerId}`)
      .then((response) => {
        dispatch(DataActionCreator.loadComments(response.data));
      });
  },
  addComment: (offerId, commentData, resetForm) => (dispatch, _getState, api) => {
    return api.post(`/comments/${offerId}`, commentData)
      .then((response) => {
        if (response.status === SUCCESS_STATUS) {
          dispatch(DataActionCreator.loadComments(response.data));
          resetForm();
        }
      });
  },
  loadFavorites: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(DataActionCreator.loadFavorites(response.data));
      });
  }
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`:
      return Object.assign({}, state, {
        city: action.payload
      });
    case `CHANGE_SORT`:
      return Object.assign({}, state, {
        sortType: action.payload
      });
    case `LOAD_OFFERS`: {
      const offersData = action.payload.map(convertApiToApp);
      return Object.assign({}, state, {
        offers: offersData,
        city: offersData[0].city, // TODO: replace with random city
      });
    }
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

export {DataActionCreator, DataOperation, dataReducer};
