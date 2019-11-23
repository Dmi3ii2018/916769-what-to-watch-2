import React from "react";
import {shallow} from "enzyme";
import {FilmsList} from "./films-list";
import {films} from "../../moks/film";

it(`correct render of films list`, () => {
  const tree = shallow(<FilmsList
    films = {films}
  />
  );

  expect(tree).toMatchSnapshot();
});
