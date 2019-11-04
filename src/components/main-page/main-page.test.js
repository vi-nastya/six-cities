import React from "react";
import renderer from "react-test-renderer";
import MainPage from "./main-page";
import {offers} from "../../mocks/offers";

it(`Main Page is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<MainPage places={offers}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
