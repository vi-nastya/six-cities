import {dataReducer, DataOperation} from "./data-reducer";
import {MOCK_OFFERS, MOCK_OFFERS_SERVER, MOCK_CITIES, MOCK_REVIEWS, MOCK_REVIEWS_SERVER, MOCK_OFFER_UPDATED_FAVORITE_SERVER, MOCK_OFFERS_UPDATED_FAVORITE} from "../../mocks";
import {SORT_TYPES, ActionType} from "../../constants";
import {createAPI} from "../../api";
import MockAdapter from "axios-mock-adapter";

describe(`API calls work correctly`, () => {
  const api = createAPI(jest.fn());
  const apiMock = new MockAdapter(api);

  it(`Should make a correct API call to /offers`, function () {
    const offerLoader = DataOperation.loadOffers();
    const dispatch = jest.fn();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return offerLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_OFFERS`,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /comments`, function () {
    const id = 0;
    const resetForm = jest.fn();
    const dispatch = jest.fn();
    const commentData = {
      rating: 4,
      comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`
    };
    const commentCreator = DataOperation.addComment(id, commentData, resetForm);

    apiMock
      .onPost(`/comments/${id}`, commentData)
      .reply(200, MOCK_REVIEWS_SERVER);

    return commentCreator(dispatch, jest.fn(), api)
      .then(() => {
        expect(resetForm).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_SENDING_REVIEW_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_COMMENTS,
          payload: MOCK_REVIEWS_SERVER,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.UPDATE_REVIEW_ERROR_STATUS,
          payload: false,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.UPDATE_SENDING_REVIEW_STATUS,
          payload: false,
        });
      });
  });

  it(`Should handle errors while posting to /comments correctly`, function () {
    const id = 0;
    const resetForm = jest.fn();
    const dispatch = jest.fn();
    const commentData = {
      rating: 4,
      comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`
    };
    const commentCreator = DataOperation.addComment(id, commentData, resetForm);

    apiMock
      .onPost(`/comments/${id}`, commentData)
      .reply(401, MOCK_REVIEWS_SERVER);

    return commentCreator(dispatch, jest.fn(), api)
      .then(() => {
        expect(resetForm).not.toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_SENDING_REVIEW_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.UPDATE_REVIEW_ERROR_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.UPDATE_SENDING_REVIEW_STATUS,
          payload: false,
        });
      });
  });
});

const initialStoreState = {
  city: {name: ``, location: {latitude: 0, longitude: 0}},
  offers: [],
  offersForCity: [],
  comments: [],
  favoriteOffers: [],
  sortType: SORT_TYPES[0],
  isSendingReview: false,
  reviewSendingError: false
};

describe(`Data reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(dataReducer(undefined, {})).toEqual(initialStoreState);
  });
  it(`Load offers with empty value should work correctly`, () => {
    expect(dataReducer(initialStoreState, {
      type: ActionType.LOAD_OFFERS,
      payload: []
    })).toEqual(initialStoreState);
  });
  it(`Load offers with parameter should update state correctly`, () => {
    expect(dataReducer(initialStoreState, {
      type: ActionType.LOAD_OFFERS,
      payload: [MOCK_OFFERS_SERVER[0]]
    })).toEqual({
      city: MOCK_OFFERS[0].city,
      offers: [MOCK_OFFERS[0]],
      offersForCity: [],
      comments: [],
      favoriteOffers: [],
      sortType: SORT_TYPES[0],
      isSendingReview: false,
      reviewSendingError: false
    });
  });
  it(`Update Favorite status with parameter should update state correctly`, () => {
    expect(dataReducer({
      city: {name: ``, location: {latitude: 0, longitude: 0}},
      offers: MOCK_OFFERS,
      offersForCity: [],
      comments: [],
      favoriteOffers: [],
      sortType: SORT_TYPES[0],
      isSendingReview: false,
      reviewSendingError: false
    }, {
      type: ActionType.UPDATE_FAVORITE_STATUS,
      payload: MOCK_OFFER_UPDATED_FAVORITE_SERVER
    })).toEqual({
      city: {name: ``, location: {latitude: 0, longitude: 0}},
      offers: MOCK_OFFERS_UPDATED_FAVORITE,
      offersForCity: [],
      comments: [],
      favoriteOffers: [],
      sortType: SORT_TYPES[0],
      isSendingReview: false,
      reviewSendingError: false
    });
  });
  it(`Change city should update state correctly`, () => {
    expect(dataReducer(initialStoreState, {
      type: ActionType.CHANGE_CITY,
      payload: MOCK_CITIES[0]
    })).toEqual({
      city: MOCK_CITIES[0],
      offers: [],
      offersForCity: [],
      comments: [],
      favoriteOffers: [],
      sortType: SORT_TYPES[0],
      isSendingReview: false,
      reviewSendingError: false
    });
  });
  it(`Change sorting should update state correctly`, () => {
    expect(dataReducer(initialStoreState, {
      type: ActionType.CHANGE_SORT,
      payload: SORT_TYPES[2]
    })).toEqual({
      city: {name: ``, location: {latitude: 0, longitude: 0}},
      offers: [],
      offersForCity: [],
      comments: [],
      favoriteOffers: [],
      sortType: SORT_TYPES[2],
      isSendingReview: false,
      reviewSendingError: false
    });
  });
  it(`Load comments should update state correctly`, () => {
    expect(dataReducer(initialStoreState, {
      type: ActionType.LOAD_COMMENTS,
      payload: MOCK_REVIEWS_SERVER
    })).toEqual({
      city: {name: ``, location: {latitude: 0, longitude: 0}},
      offers: [],
      offersForCity: [],
      comments: MOCK_REVIEWS,
      favoriteOffers: [],
      sortType: SORT_TYPES[0],
      isSendingReview: false,
      reviewSendingError: false
    });
  });
  it(`Load favorites should update state correctly`, () => {
    expect(dataReducer(initialStoreState, {
      type: ActionType.LOAD_FAVORITES,
      payload: MOCK_OFFERS_SERVER
    })).toEqual({
      city: {name: ``, location: {latitude: 0, longitude: 0}},
      offers: [],
      offersForCity: [],
      comments: [],
      favoriteOffers: MOCK_OFFERS,
      sortType: SORT_TYPES[0],
      isSendingReview: false,
      reviewSendingError: false
    });
  });
  it(`Update review sending status should update state correctly`, () => {
    expect(dataReducer(initialStoreState, {
      type: ActionType.UPDATE_SENDING_REVIEW_STATUS,
      payload: true
    })).toEqual({
      city: {name: ``, location: {latitude: 0, longitude: 0}},
      offers: [],
      offersForCity: [],
      comments: [],
      favoriteOffers: [],
      sortType: SORT_TYPES[0],
      isSendingReview: true,
      reviewSendingError: false
    });
  });
  it(`Update review error status should update state correctly`, () => {
    expect(dataReducer(initialStoreState, {
      type: ActionType.UPDATE_REVIEW_ERROR_STATUS,
      payload: true
    })).toEqual({
      city: {name: ``, location: {latitude: 0, longitude: 0}},
      offers: [],
      offersForCity: [],
      comments: [],
      favoriteOffers: [],
      sortType: SORT_TYPES[0],
      isSendingReview: false,
      reviewSendingError: true
    });
  });
});
