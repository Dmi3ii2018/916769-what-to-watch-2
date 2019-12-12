import {createSelector} from "reselect";
import {INITIAL_GENRE} from "../reducer/root-reducer";

export const getFilmsList = (state) => {
  return state;
};

export const createFilterList = (state) => {
  const genres = new Set();
  genres.add(INITIAL_GENRE);
  state.filterReducer.filmsList.forEach((it) => genres.add(it.genre));

  return Array.from(genres);
};

export const filterFilmsList = (state) => {
  if (state.filterReducer.genre !== INITIAL_GENRE) {
    const filteredFilmsList = state.filterReducer.filmsList.filter((film) => film.genre === state.filterReducer.genre);
    return filteredFilmsList;
  }
  return state.filterReducer.filmsList;
};

export const getFilmsListByGenre = createSelector(
    getFilmsList,
    filterFilmsList
);
