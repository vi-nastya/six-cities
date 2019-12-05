import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import PlaceDetails from "./place-details";
import {offers} from "../../mocks/offers";

Enzyme.configure({adapter: new Adapter()});

it(`Place Details is rendered correctly after relaunch`, () => {
  const tree = shallow(<PlaceDetails placeData={offers[0]}/>);

  expect(toJSON(tree)).toMatchSnapshot();
});
