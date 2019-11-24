import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card";
import {offers} from "../../mocks/offers";

Enzyme.configure({adapter: new Adapter()});


const hoverHandler = jest.fn();
const welcomeScreen = shallow(<PlaceCard place={offers[0]} onHoverOn={hoverHandler} onHoverOff={jest.fn()}/>);

welcomeScreen.simulate(`mouseenter`);

describe(`Test for PlaceCard hover`, () => {
  it(`PlaceCard hover handler works correctly`, () => {
    expect(hoverHandler).toHaveBeenCalledTimes(1);
  });

  it(`Hover handler received the correct place data as an argument`, () => {
    expect(hoverHandler).toBeCalledWith();
  });
});
