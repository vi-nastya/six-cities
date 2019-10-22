import React from "react";
import renderer from "react-test-renderer";
import MainPage from "./main-page";

it(`Main Page is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<MainPage placeNames={[`place 1`, `place 2`, `place 3`, `place 4`]}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
