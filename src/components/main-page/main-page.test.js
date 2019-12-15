import React from "react";
import renderer from "react-test-renderer";
import {MainPage} from "./main-page";
import {MOCK_OFFERS} from "../../mocks";

jest.mock(`../header/header`, () => jest.fn().mockReturnValue(null));
jest.mock(`../map/map`, () => `Map`);
jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));


it(`MainPage component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<MainPage
    city={MOCK_OFFERS[0].city}
    offersForCity={MOCK_OFFERS}
    citiesList={[MOCK_OFFERS[0].city]}
    offers={MOCK_OFFERS}
    activeItem={-1}
    setActiveItem={jest.fn()}
    onCityChange={jest.fn()}
    onSortTypeChange={jest.fn()}
    sortType={{name: `DEFAULT`, text: `Popular`}}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
