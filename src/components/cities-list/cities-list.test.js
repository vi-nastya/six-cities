import React from "react";
import renderer from "react-test-renderer";
import {CitiesList} from "./cities-list";

it(`Cities list is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<CitiesList cities={[{name: `Amsterdam`}, {name: `Moscow`}]} activeCity={{name: `Amsterdam`}} changeCityHandler={jest.fn()}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
