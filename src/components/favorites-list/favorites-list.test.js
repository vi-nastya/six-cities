import React from "react";
import renderer from "react-test-renderer";
import {FavoritesList} from "./favorites-list";
import {MOCK_OFFERS} from "../../mocks";

jest.mock(`../header/header`, () => jest.fn().mockReturnValue(null));
jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));

it(`FavoritesList component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<FavoritesList
    favoritesData={[{city: `Moscow`, offersList: MOCK_OFFERS}]}
    onLoadFavorites={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
