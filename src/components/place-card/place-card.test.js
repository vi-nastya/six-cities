import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card";
import {offers} from "../../mocks/offers";

it(`Place Card is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<PlaceCard place={offers[0]} onHoverOn={jest.fn()} onHoverOff={jest.fn()}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
