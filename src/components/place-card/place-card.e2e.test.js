import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card";
import {offers} from "../../mocks/offers";

Enzyme.configure({adapter: new Adapter()});

it(`PlaceCard hover handler works correctly`, () => {
  const hoverHandler = jest.fn();
  const welcomeScreen = shallow(<PlaceCard place={offers[0]} onHover={hoverHandler}/>);

  welcomeScreen.simulate(`mouseover`);

  expect(hoverHandler).toHaveBeenCalledTimes(1);
});
