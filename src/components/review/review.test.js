import React from "react";
import renderer from "react-test-renderer";
import Review from "./review";
import {MOCK_REVIEWS} from "../../mocks";

it(`Review component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<Review reviewData={MOCK_REVIEWS[0]}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
