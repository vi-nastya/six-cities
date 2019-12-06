import {createSelector} from 'reselect';
import _ from "lodash";

const getCity = (state) => state.city;
const getOffers = (state) => state.offers;

export const getCitiesList = createSelector(
    [getOffers],
    (offers) => {
      return _.uniqBy(offers.map((offer) => offer.city), `name`);
    }
);

export const getOffersForCity = createSelector(
    [getOffers, getCity],
    (offers, city) => {
      return offers.filter((offer) => offer.city.name === city.name);
    }
);
