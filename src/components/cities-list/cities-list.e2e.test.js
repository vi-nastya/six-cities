import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {CitiesList} from "./cities-list";
import {offers} from "../../mocks/offers";

Enzyme.configure({adapter: new Adapter()});


const clickHandler = jest.fn();
const citiesList = shallow(<CitiesList offers={[offers[0]]} activeCity={`Amsterdam`} changeCityHandler={clickHandler}/>);
const cityName = citiesList.find(`.locations__item`);
cityName.simulate(`click`);

describe(`Test for CitiesList hover`, () => {
  it(`CitiesList city name click handler works correctly`, () => {
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it(`City name click handler received the correct city and offers data as an argument`, () => {
    expect(clickHandler).toBeCalledWith([offers[0]], `Amsterdam`);
  });
});
