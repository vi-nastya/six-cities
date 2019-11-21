import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveItem from "./with-active-item";

configure({adapter: new Adapter()});

const MockComponent = () => <div/>;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`Defaut ActiveItem value is -1`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state().activeItem).toEqual(-1);
});
