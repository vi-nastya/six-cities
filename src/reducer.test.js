import {ActionCreator, reducer, getOffersForCity} from "./reducer";
import {offers} from "./mocks/offers";

describe(`Action creators work correctly`, () => {
  it(`CHANGE_CITY changes city correctly`, () => {
    expect(ActionCreator.changeCity(`Moscow`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Moscow`,
    });
  });
  it(`GET_OFFERS works correctly`, () => {
    expect(ActionCreator.getOffers([
      {name: `1`, city: `Moscow`},
      {name: `2`, city: `Moscow`},
      {name: `3`, city: `Montreal`}], `Montreal`)).toEqual({
      type: `GET_OFFERS`,
      payload: [{name: `3`, city: `Montreal`}],
    });
  });
});


describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: offers[0].city,
      offers,
      offersForCity: getOffersForCity(offers, offers[0].city),
    });
  });
  it(`Reducer should change city to a given value`, () => {
    expect(reducer({
      city: `Montreal`,
      offers: [{name: `1`, city: `Moscow`},
        {name: `2`, city: `Moscow`},
        {name: `3`, city: `Montreal`}],
      offersForCity: [{name: `3`, city: `Montreal`}]

    }, {
      type: `CHANGE_CITY`,
      payload: `Moscow`,
    })).toEqual({
      city: `Moscow`,
      offers: [{name: `1`, city: `Moscow`},
        {name: `2`, city: `Moscow`},
        {name: `3`, city: `Montreal`}],
      offersForCity: [{name: `3`, city: `Montreal`}]
    });
  });
  it(`Reducer should get offers for a given city`, () => {
    expect(reducer({
      city: `Moscow`,
      offers: [{name: `1`, city: `Moscow`},
        {name: `2`, city: `Moscow`},
        {name: `3`, city: `Montreal`}],
      offersForCity: []

    }, {
      type: `GET_OFFERS`,
      payload: [{name: `1`, city: `Moscow`},
        {name: `2`, city: `Moscow`}],
    })).toEqual({
      city: `Moscow`,
      offers: [{name: `1`, city: `Moscow`},
        {name: `2`, city: `Moscow`},
        {name: `3`, city: `Montreal`}],
      offersForCity: [{name: `1`, city: `Moscow`},
        {name: `2`, city: `Moscow`}]
    });
  });
});
