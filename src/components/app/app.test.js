import React from "react";
import renderer from "react-test-renderer";
import App from "./app";
import {offers} from "../../mocks/offers";

it(`App is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<App places={offers}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
