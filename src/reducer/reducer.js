import {films} from "../moks/film";

const INITIAL_GENRE = `All genres`;

const initialState = {
  genre: INITIAL_GENRE,
  filmsList: films,
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case `SET_FILTER`:
      return Object.assign({}, state, {
        genre: action.genre,
      });
    default:
      return state;
  }
};
