import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";

jest.mock(`react-router-dom`, () => ({
  Link: () => null,
  Switch: () => null,
  Route: () => null
}));

it(`App component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<App
    isAuthorizationRequired={false}
    onLogin={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
