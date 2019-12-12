import React from "react";
import renderer from "react-test-renderer";
import {FavoritesList} from "./favorites-list";
import {offers} from "../../mocks/offers";

it(`FavoritesList component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<FavoritesList
    favoritesData={[{city: `Moscow`, offersList: offers}]}
    onLoadFavorites={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
