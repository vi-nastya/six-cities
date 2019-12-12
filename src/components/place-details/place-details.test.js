import React from "react";
import renderer from "react-test-renderer";
import {PlaceDetails} from "./place-details";
import {offers} from "../../mocks/offers";
import {reviews} from "../../mocks/reviews";

it(`PlaceDetails component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<PlaceDetails
    placeData={offers[0]}
    changeFavoriteHandler={jest.fn()}
    onLoadComments={jest.fn()}
    match={{params: {id: 1}}}
    reviews={reviews}
    nearbyPlaces={[offers[1]]}
    onFormSubmit={jest.fn()}
    isAuthorizationRequired={true}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
