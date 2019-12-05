import React from "react";
import renderer from "react-test-renderer";
import SignInForm from "./sign-in-form";

it(`Signin form is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<SignInForm onFormSubmit={jest.fn()}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
