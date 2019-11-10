import React from "react";
import renderer from "react-test-renderer";
import {CitiesList} from "./cities-list";
import {offers} from "../../mocks/offers";

it(`Cities list is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<CitiesList offers={offers} activeCity={`Amsterdam`} changeCityHandler={jest.fn()}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
