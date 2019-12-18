import React from "react";
import {Main} from "../main/main";
import {films} from "../../moks/film";
import {shallow} from "enzyme";

it(`MainPage correctly renders after relaunch`, () => {
  const tree = shallow(<Main
    onHeaderClick = {jest.fn()}
    filmData = {films}
    avatarSrc = {`path`}
    isAuthorizationRequired = {false}
    promoFilm = {{backgroundColor: `white`}}
    setFavorite = {jest.fn()}
  />);

  expect(tree).toMatchSnapshot();
});
