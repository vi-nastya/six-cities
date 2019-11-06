import React from "react";
import renderer from "react-test-renderer";
import Map from "./map";

jest.mock(`leaflet`, () => ({
  icon: jest.fn(),
  map: jest.fn().mockReturnValue({
    setView: jest.fn(),
    remove: jest.fn()
  }),
  tileLayer: jest.fn().mockReturnValue({
    addTo: jest.fn()
  }),
  marker: jest.fn().mockReturnValue({
    addTo: jest.fn()
  }),
}));

it(`Map component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<Map points={[]}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
