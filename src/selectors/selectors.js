import {createSelector} from 'reselect';
import _ from "lodash";

const MAX_NEARBY_PLACES = 3;

const sortOffers = (offers, sortType) => {
  switch (sortType) {
    case `DEFAULT`:
      return offers;
    case `PRICE_ASC`:
      return offers.sort((offer1, offer2) => (offer1.price > offer2.price) ? 1 : -1);
    case `PRICE_DESC`:
      return offers.sort((offer1, offer2) => (offer1.price < offer2.price) ? 1 : -1);
    case `RATING`:
      return offers.sort((offer1, offer2) => (offer1.rating < offer2.rating) ? 1 : -1);
  }
  return offers;
};

const getCity = (state) => state.city;
const getOffers = (state) => state.offers;
const getFavoriteOffers = (state) => state.favoriteOffers;
const getSortType = (state) => state.sortType;


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
    [getOffers, getCity, getSortType],
    (offers, city, sortType) => {
      return sortOffers(offers.filter((offer) => offer.city.name === city.name), sortType.name);
    }
);

export const getGroupedFavoriteOffers = createSelector(
    [getFavoriteOffers],
    (offers) => {
      let groupedOffers = {};
      for (let i = 0; i < offers.length; i++) {
        const currentCity = offers[i].city.name;
        if (groupedOffers[currentCity] !== undefined) {
          groupedOffers[currentCity].push(offers[i]);
        } else {
          groupedOffers[currentCity] = [offers[i]];
        }
      }
      let groupedOffersArray = [];
      for (let [city, offersList] of Object.entries(groupedOffers)) {
        groupedOffersArray.push({city, offersList});
      }
      return groupedOffersArray;
    }
);
