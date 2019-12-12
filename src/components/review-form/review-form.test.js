import React from "react";
import renderer from "react-test-renderer";
import ReviewForm from "./review-form";

it(`ReviewForm component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<ReviewForm onInputChange={jest.fn()} onFormSubmit={jest.fn()} isValid={true} formRef={jest.fn()}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
