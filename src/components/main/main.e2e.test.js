import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "../main/main";

Enzyme.configure({adapter: new Adapter()});

it(`invokes onClick`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<Main
    filmNames = {[]}
    onHeaderClick={clickHandler}
  />);

  const header = app.find(`.movie-card__title`);
  header.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
