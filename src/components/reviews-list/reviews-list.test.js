import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list";
import {MOCK_REVIEWS} from "../../mocks";

it(`ReviewsList component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<ReviewsList reviewsData={MOCK_REVIEWS}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
