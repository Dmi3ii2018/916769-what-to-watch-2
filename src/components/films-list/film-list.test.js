import React from "react";
import renderer from "react-test-renderer";
import {FilmsList} from "./films-list";
import {films} from "../../moks/film";

it(`correct render of films list`, () => {
  const tree = renderer
    .create(<FilmsList
      films = {films}
    />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
