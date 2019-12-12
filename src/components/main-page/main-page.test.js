import React from "react";
import renderer from "react-test-renderer";
import {MainPage} from "./main-page";
import {offers} from "../../mocks/offers";

jest.mock(`../header/header`, () => jest.fn().mockReturnValue(null));
jest.mock(`../map/map`, () => `Map`);
jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));


it(`ReviewForm component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<MainPage
    city={offers[0].city}
    offersForCity={offers}
    citiesList={[offers[0].city]}
    offers={offers}
    activeItem={-1}
    setActiveItem={jest.fn()}
    changeCityHandler={jest.fn()}
    changeSortingHandler={jest.fn()}
    sortType={{name: `DEFAULT`, text: `Popular`}}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
