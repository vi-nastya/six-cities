import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card";
import {MOCK_OFFERS} from "../../mocks";

jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));


it(`Place Card is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<PlaceCard
    place={MOCK_OFFERS[0]}
    onHoverOn={jest.fn()}
    onHoverOff={jest.fn()}
    cardClass={`cities__place-card`}
    imageClass={`cities__image-wrapper`}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
