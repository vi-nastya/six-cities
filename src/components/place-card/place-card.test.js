import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card";

it(`Place Card is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<PlaceCard placeName={`Name`} onNameClick={jest.fn()}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
