import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {SmallMovieCard} from "./small-movie-card";

Enzyme.configure({adapter: new Adapter()});

it(`small movie card is active on hover`, () => {
  const onMovieCardHover = jest.fn();
  const app = shallow(<SmallMovieCard
    name = {``}
    src = {``}
    onFilmCardOver = {onMovieCardHover}
  />);

  const card = app.find(`article`);
  card.simulate(`mouseover`);

  expect(onMovieCardHover).toHaveBeenCalledTimes(1);
});
