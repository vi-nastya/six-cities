import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import {MainPage} from "./main-page";
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

it(`Main Page is rendered correctly after relaunch`, () => {
  const tree = shallow(<MainPage offersForCity={[offers[0]]} city={`Amsterdam`} activeItem={-1} setActiveItem={jest.fn()}/>);

  expect(toJSON(tree)).toMatchSnapshot();
});
