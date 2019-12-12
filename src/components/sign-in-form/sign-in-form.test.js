import React from "react";
import renderer from "react-test-renderer";
import SignInForm from "./sign-in-form";

jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));

jest.mock(`../header/header`, () => null);

it(`SignInForm component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<SignInForm onFormSubmit={jest.fn()}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
