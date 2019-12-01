import {ActionCreator, reducer, Operation} from "./reducer";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "./api";

describe(`Action creators work correctly`, () => {
  it(`CHANGE_CITY changes city correctly`, () => {
    expect(ActionCreator.changeCity({name: `Moscow`})).toEqual({
      type: `CHANGE_CITY`,
      payload: {name: `Moscow`},
    });
  });
  it(`GET_OFFERS works correctly`, () => {
    expect(ActionCreator.getOffers([
      {name: `1`, city: {name: `Moscow`}},
      {name: `2`, city: {name: `Moscow`}},
      {name: `3`, city: {name: `Montreal`}}], {name: `Montreal`})).toEqual({
      type: `GET_OFFERS`,
      payload: [{name: `3`, city: {name: `Montreal`}}],
    });
  });
});


describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: null,
      offers: [],
      offersForCity: [],
    });
  });
  it(`Reducer should change city to a given value`, () => {
    expect(reducer({
      city: {name: `Montreal`},
      offers: [{name: `1`, city: {name: `Moscow`}},
        {name: `2`, city: {name: `Moscow`}},
        {name: `3`, city: {name: `Montreal`}}],
      offersForCity: [{name: `3`, city: {name: `Montreal`}}]

    }, {
      type: `CHANGE_CITY`,
      payload: {name: `Moscow`},
    })).toEqual({
      city: {name: `Moscow`},
      offers: [{name: `1`, city: {name: `Moscow`}},
        {name: `2`, city: {name: `Moscow`}},
        {name: `3`, city: {name: `Montreal`}}],
      offersForCity: [{name: `3`, city: {name: `Montreal`}}]
    });
  });
  it(`Reducer should get offers for a given city`, () => {
    expect(reducer({
      city: {name: `Moscow`},
      offers: [{name: `1`, city: {name: `Moscow`}},
        {name: `2`, city: {name: `Moscow`}},
        {name: `3`, city: {name: `Montreal`}}],
      offersForCity: []

    }, {
      type: `GET_OFFERS`,
      payload: [{name: `1`, city: {name: `Moscow`}},
        {name: `2`, city: {name: `Moscow`}}],
    })).toEqual({
      city: {name: `Moscow`},
      offers: [{name: `1`, city: {name: `Moscow`}},
        {name: `2`, city: {name: `Moscow`}},
        {name: `3`, city: {name: `Montreal`}}],
      offersForCity: [{name: `1`, city: {name: `Moscow`}},
        {name: `2`, city: {name: `Moscow`}}]
    });
  });
});

describe(`Data reducer works correctly`, () => {
  it(`Should make a correct API call to /offers`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offerLoader = Operation.loadOffers();

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
