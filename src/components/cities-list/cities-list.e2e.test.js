import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {CitiesList} from "./cities-list";

Enzyme.configure({adapter: new Adapter()});


const clickHandler = jest.fn();
const citiesList = shallow(<CitiesList cities={[{name: `Moscow`}]} activeCity={{name: `Moscow`}} changeCityHandler={clickHandler}/>);
const cityName = citiesList.find(`.locations__item`);
cityName.simulate(`click`);

describe(`Test for CitiesList hover`, () => {
  it(`CitiesList city name click handler works correctly`, () => {
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it(`City name click handler received the correct city as an argument`, () => {
    expect(clickHandler).toBeCalledWith({name: `Moscow`});
  });
});
