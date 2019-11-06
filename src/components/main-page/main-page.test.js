import React from "react";
import renderer from "react-test-renderer";
import MainPage from "./main-page";
import {offers} from "../../mocks/offers";

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

it(`Main Page is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<MainPage places={offers}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
