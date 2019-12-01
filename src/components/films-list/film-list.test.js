import React from "react";
import {shallow} from "enzyme";
import {Films} from "./films-list";
import {films} from "../../moks/film";

it(`correct render of films list`, () => {
  const tree = shallow(<Films
    films = {films}
  />
  );

  expect(tree).toMatchSnapshot();
});
