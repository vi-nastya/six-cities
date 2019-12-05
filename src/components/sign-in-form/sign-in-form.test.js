import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import SignInForm from "./sign-in-form";

Enzyme.configure({adapter: new Adapter()});

it(`Signin form is rendered correctly after relaunch`, () => {
  const tree = shallow(<SignInForm onFormSubmit={jest.fn()}/>);

  expect(toJSON(tree)).toMatchSnapshot();
});
