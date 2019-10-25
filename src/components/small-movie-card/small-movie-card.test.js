import React from "react";
import renderer from "react-test-renderer";
import {SmallMovieCard} from "./small-movie-card";

it(`Small movie card renders correctly`, () => {
  const tree = renderer
    .create(<SmallMovieCard
      name = {`Fantastic Beasts: The Crimes of Grindelwald`}
      src = {`fantastic-beasts-the-crimes-of-grindelwald`}
      onFilmCardOver = {() => {} }
    />

    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
