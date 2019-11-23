import React from "react";
import {shallow} from "enzyme";
// import renderer from "react-test-renderer";
import {SmallMovieCard} from "./small-movie-card";

it(`Small movie card renders correctly`, () => {
  const tree = shallow(<SmallMovieCard
    name = {`Fantastic Beasts: The Crimes of Grindelwald`}
    img = {`fantastic-beasts-the-crimes-of-grindelwald`}
    id = {1}
    onFilmCardOver = {jest.fn()}
    onFilmCardOut = {jest.fn()}
  />);

  expect(tree).toMatchSnapshot();
});
