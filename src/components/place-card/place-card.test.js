import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card";
import {MOCK_OFFERS} from "../../mocks";
import {PlaceCardType} from "../../constants";

jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));


it(`Place Card is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<PlaceCard
    place={MOCK_OFFERS[0]}
    onHoverOn={jest.fn()}
    onHoverOff={jest.fn()}
    cardType={PlaceCardType.MAIN_PAGE}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
