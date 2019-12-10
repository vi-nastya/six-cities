import {createSelector} from 'reselect';
import _ from "lodash";

const MAX_NEARBY_PLACES = 3;

const getCity = (state) => state.city;
const getOffers = (state) => state.offers;

export const getCitiesList = createSelector(
    [getOffers],
    (offers) => {
      return _.uniqBy(offers.map((offer) => offer.city), `name`);
    }
);

export const getOfferById = (offerId) => {
  return createSelector(
      [getOffers],
      (offers) => {
        return offers[offers.findIndex((offer) => offer.id === offerId)];
      }
  );
};

export const getNearbyPlaces = (offerId) => {
  return createSelector(
      [getOffersForCity],
      (offers) => {
        return offers.filter((offer) => offer.id !== offerId).slice(0, MAX_NEARBY_PLACES);
      }
  );
};

export const getOffersForCity = createSelector(
    [getOffers, getCity],
    (offers, city) => {
      return offers.filter((offer) => offer.city.name === city.name);
    }
);
