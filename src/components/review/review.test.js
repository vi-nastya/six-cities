import React from "react";
import renderer from "react-test-renderer";
import Review from "./review";
import {reviews} from "../../mocks/reviews";

it(`Review component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<Review reviewData={reviews[0]}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
