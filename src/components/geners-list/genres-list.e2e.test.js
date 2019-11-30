import React from "react";
import {shallow} from "enzyme";
import {Genres} from "./genres-list";

it(`proper work of filter`, () => {
  const onFilterClick = jest.fn();

  const tree = shallow(<Genres
    filterName={`Drama`}
    filterNamesList={[`Drama`, `Comedy`, `Crime`]}
    onGenreClick={onFilterClick}
  />);

  const filterItem = tree.find(`ul`).childAt(0).childAt(0);
  filterItem.simulate(`click`);

  expect(onFilterClick).toHaveBeenCalledTimes(1);
});
