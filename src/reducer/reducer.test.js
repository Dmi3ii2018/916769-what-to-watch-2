import {filterReducer} from "./reducer";
// import {setFilter} from "../actions/actions";
import {films} from "../moks/film";

const INITIAL_GENRE = `All genres`;

describe(`filter reducer`, () => {
  it(`should return the initial state`, () => {
    expect(filterReducer(undefined, {})).toEqual(
        {
          genre: INITIAL_GENRE,
          filmsList: films,
        }
    );
  });

  it(`should handle SET_FILTER`, () => {
    expect(
        filterReducer(undefined, {
          type: `SET_FILTER`,
          genre: `Comedy`,
        })
    ).toEqual(
        {
          genre: `Comedy`,
          filmsList: films,
        });
  });
});
