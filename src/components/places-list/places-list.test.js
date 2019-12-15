import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "./places-list";
import {MOCK_OFFERS} from "../../mocks";

jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));


it(`Place Card is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<PlacesList places={MOCK_OFFERS} setActiveItem={jest.fn()}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
