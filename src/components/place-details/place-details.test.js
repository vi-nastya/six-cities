import React from "react";
import renderer from "react-test-renderer";
import {PlaceDetails} from "./place-details";
import {MOCK_OFFERS, MOCK_REVIEWS} from "../../mocks";

jest.mock(`../header/header`, () => jest.fn().mockReturnValue(null));
jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));
jest.mock(`../map/map`, () => `Map`);

it(`PlaceDetails component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<PlaceDetails
    placeData={MOCK_OFFERS[0]}
    changeFavoriteHandler={jest.fn()}
    onLoadComments={jest.fn()}
    match={{params: {id: `1`}}}
    reviews={MOCK_REVIEWS}
    nearbyPlaces={[MOCK_OFFERS[1]]}
    onFormSubmit={jest.fn()}
    isSendingReview={false}
    reviewSendingError={false}
    isAuthorizationRequired={true}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
