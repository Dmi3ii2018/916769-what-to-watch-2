import React from "react";
import renderer from "react-test-renderer";
import {MainPage} from "../main/main";

it(`MainPage correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<MainPage
      filmNames = {[`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Avengers`]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
