import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card";
import {MOCK_OFFERS} from "../../mocks";

Enzyme.configure({adapter: new Adapter()});


const hoverHandler = jest.fn();
const welcomeScreen = shallow(<PlaceCard
  place={MOCK_OFFERS[0]}
  onHoverOn={hoverHandler}
  onHoverOff={jest.fn()}
  cardClass={`cities__place-card`}
  imageClass={`cities__image-wrapper`}/>);

welcomeScreen.simulate(`mouseenter`);

describe(`Test for PlaceCard hover`, () => {
  it(`PlaceCard hover handler works correctly`, () => {
    expect(hoverHandler).toHaveBeenCalledTimes(1);
  });

  it(`Hover handler received the correct place data as an argument`, () => {
    expect(hoverHandler).toBeCalledWith();
  });
});
