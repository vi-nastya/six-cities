import {convertApiToApp, convertCommentApiToApp, getRandomNumber} from '../../utils';
import {SORT_TYPES, SUCCESS_CODE} from "../../constants";

const EMPTY_CITY = {name: ``, location: {latitude: 0, longitude: 0}};

const initialState = {
  city: EMPTY_CITY,
  offers: [],
  offersForCity: [],
  comments: [],
  favoriteOffers: [],
  sortType: SORT_TYPES[0],
  isSendingReview: false,
  reviewSendingError: false,
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
  updateSendingReviewStatus: (newStatus) => ({
    type: `UPDATE_SENDING_REVIEW_STATUS`,
    payload: newStatus,
  }),
  updateReviewErrorStatus: (newStatus) => ({
    type: `UPDATE_REVIEW_ERROR_STATUS`,
    payload: newStatus,
  })
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
    dispatch(DataActionCreator.updateSendingReviewStatus(true));
    return api.post(`/comments/${offerId}`, commentData)
      .then((response) => {
        if (response.status === SUCCESS_CODE) {
          dispatch(DataActionCreator.loadComments(response.data));
          dispatch(DataActionCreator.updateReviewErrorStatus(false));
          resetForm();
        } else {
          dispatch(DataActionCreator.updateReviewErrorStatus(true));
        }
        dispatch(DataActionCreator.updateSendingReviewStatus(false));
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
      const newCity = offersData.length ? offersData[getRandomNumber(offersData.length)].city : EMPTY_CITY;
      return Object.assign({}, state, {
        offers: offersData,
        city: newCity
      });
    }
    case `UPDATE_FAVORITE_STATUS`:
      return Object.assign({}, state, {
        offers: state.offers.map((offer) => offer.id === action.payload.id ? convertApiToApp(action.payload) : offer)
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
    case `UPDATE_SENDING_REVIEW_STATUS`:
      return Object.assign({}, state, {
        isSendingReview: action.payload,
      });
    case `UPDATE_REVIEW_ERROR_STATUS`:
      return Object.assign({}, state, {
        reviewSendingError: action.payload,
      });
  }

  return state;
};

export {DataActionCreator, DataOperation, dataReducer};
