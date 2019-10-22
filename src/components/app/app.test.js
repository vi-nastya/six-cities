import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

it(`App is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<App placeNames={[`place 1`, `place 2`, `place 3`, `place 4`]}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
