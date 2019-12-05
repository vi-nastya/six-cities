import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header";

it(`Header is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<Header userEmail={`user@mail.ru`}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
