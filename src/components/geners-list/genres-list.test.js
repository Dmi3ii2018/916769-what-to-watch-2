import React from "react";
import {shallow} from "enzyme";
import {Genres} from "./genres-list";

it(`Filter component renders properly`, () => {
  const tree = shallow(<Genres
    filterName={`Drama`}
    filterNamesList={[`Drama`, `Comedy`, `Crime`]}
    onGenreClick={jest.fn()}
  />);

  expect(tree).toMatchSnapshot();
});

