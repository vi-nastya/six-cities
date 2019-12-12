import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list";
import {reviews} from "../../mocks/reviews";

it(`ReviewsList component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<ReviewsList reviewsData={reviews}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
