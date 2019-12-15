import {dataReducer, DataOperation} from "./data-reducer";
import {MOCK_OFFERS, MOCK_OFFERS_SERVER, MOCK_CITIES, MOCK_REVIEWS, MOCK_REVIEWS_SERVER, MOCK_OFFER_UPDATED_FAVORITE_SERVER, MOCK_OFFERS_UPDATED_FAVORITE} from "../../mocks";
import {SORT_TYPES, ActionType} from "../../constants";
import {createAPI} from "../../api";
import MockAdapter from "axios-mock-adapter";

describe(`load data test`, () => {
  it(`Should make a correct API call to /offers`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offerLoader = DataOperation.loadOffers();

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
