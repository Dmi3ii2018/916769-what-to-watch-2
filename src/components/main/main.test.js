import React from "react";
import renderer from "react-test-renderer";
import {MainPage} from "../main/main";
import {films} from "../../moks/film";

it(`MainPage correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<MainPage
      // filmNames = {data.filmNames}
      onHeaderClick = {() => ``}
      filmData = {films}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
