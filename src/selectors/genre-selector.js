import {createSelector} from "reselect";
import {INITIAL_GENRE} from "../reducer/reducer";

export const getFilmsList = (state) => {
  return state;
};

export const createFilterList = (state) => {
  const genres = new Set();
  genres.add(INITIAL_GENRE);
  state.filmsList.forEach((it) => genres.add(it.genre));

  return Array.from(genres);
};

export const filterFilmsList = (state) => {
  if (state.genre !== INITIAL_GENRE) {
    const filteredFilmsList = state.filmsList.filter((film) => film.genre === state.genre);
    return filteredFilmsList;
  }
  return state.filmsList;
};

export const getFilmsListByGenre = createSelector(
    getFilmsList,
    filterFilmsList
);
