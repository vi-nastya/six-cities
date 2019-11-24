import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveItem from "./with-active-item";

configure({adapter: new Adapter()});
const MockComponent = (props) => <button className="click-me" onClick={() => props.setActiveItem(props.activeItem + 1)}>Click Me</button>;
MockComponent.propTypes = {
  activeItem: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
};
const MockComponentWrapped = withActiveItem(MockComponent);
const wrapper = mount(<MockComponentWrapped />);

it(`Defaut ActiveItem value is -1`, () => {
  expect(wrapper.state().activeItem).toEqual(-1);
});

it(`setActiveItem  works correctly`, () => {
  wrapper.find(MockComponent).simulate(`click`);
  expect(wrapper.state().activeItem).toEqual(0);
});
