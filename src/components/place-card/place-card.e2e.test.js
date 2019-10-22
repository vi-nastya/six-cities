import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card";

Enzyme.configure({adapter: new Adapter()});

it(`PlaceCard name click handler works correctly`, () => {
  const clickHandler = jest.fn();
  const welcomeScreen = shallow(<PlaceCard placeName={`Place`} onNameClick={clickHandler}/>);

  const nameLink = welcomeScreen.find(`.place-card__name a`);
  nameLink.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
