import React from "react";
import renderer from "react-test-renderer";
import {CitiesList} from "./cities-list";

it(`Cities list is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<CitiesList cities={[`Amsterdam`, `Moscow`]} activeCity={`Amsterdam`} changeCityHandler={jest.fn()}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
