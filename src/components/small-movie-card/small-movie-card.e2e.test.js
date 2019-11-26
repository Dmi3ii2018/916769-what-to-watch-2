import React from "react";
import {shallow} from "enzyme";
import {SmallMovieCard} from "./small-movie-card";
// import {films} from "../../moks/film";

it(`small movie card is active on hover`, () => {
  const onMovieCardHover = jest.fn();
  const onMovieCardOut = jest.fn();
  const id = 1;
  const app = shallow(<SmallMovieCard
    name = {`Avrora`}
    img = {`path`}
    id = {id}
    preview = {`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`}
    onFilmCardOver = {onMovieCardHover}
    onFilmCardOut = {onMovieCardOut}
  />);

  const card = app.find(`article`);
  card.simulate(`mouseover`);

  expect(onMovieCardHover).toHaveBeenCalledTimes(1);
  expect(onMovieCardHover.mock.calls[0][0]).toEqual(id);
});
