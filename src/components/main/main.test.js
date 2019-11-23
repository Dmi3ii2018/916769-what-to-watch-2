import React from "react";
import {MainPage} from "../main/main";
import {films} from "../../moks/film";
import {shallow} from "enzyme";

it(`MainPage correctly renders after relaunch`, () => {
  const tree = shallow(<MainPage
    onHeaderClick = {jest.fn()}
    filmData = {films}
  />);

  expect(tree).toMatchSnapshot();
});
