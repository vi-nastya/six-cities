import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import App from "./app";
import {offers} from "../../mocks/offers";

Enzyme.configure({adapter: new Adapter()});

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

it(`App is rendered correctly after relaunch`, () => {
  const tree = shallow(<App places={offers}/>);

  expect((toJSON(tree))).toMatchSnapshot();
});
