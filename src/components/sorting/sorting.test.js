import React from "react";
import renderer from "react-test-renderer";
import Sorting, {SORT_TYPES} from "./sorting";

it(`Sorting component is rendered correctly after relaunch`, () => {
  const tree = renderer.create(<Sorting isOpen={true}
    activeSortType={SORT_TYPES[0]}
    toggleSortListHandler={jest.fn()}
    sortTypeClickHandler={jest.fn()}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
