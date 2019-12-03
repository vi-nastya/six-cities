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
