import React from "react";
import {shallow} from "enzyme";
import SmallMovieCard from "./small-movie-card";

it(`Small movie card renders correctly`, () => {
  const tree = shallow(<SmallMovieCard
    name = {`Fantastic Beasts: The Crimes of Grindelwald`}
    img = {`fantastic-beasts-the-crimes-of-grindelwald`}
    id = {1}
    preview = {`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`}
    onFilmCardOver = {jest.fn()}
    onFilmCardOut = {jest.fn()}
  />);

  expect(tree).toMatchSnapshot();
});
