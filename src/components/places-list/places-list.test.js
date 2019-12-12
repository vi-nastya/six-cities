import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "./places-list";
import {offers} from "../../mocks/offers";

jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));


it(`Place Card is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<PlacesList places={offers} setActiveItem={jest.fn()}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
