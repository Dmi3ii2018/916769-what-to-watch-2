import {initialState} from "./root-reducer";

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case `SET_FILTER`:
      return Object.assign({}, state, {
        genre: action.genre,
      });

    case `LOAD_FILMS`:
      return Object.assign({}, state, {
        filmsList: action.payload
      });

    case `LOAD_FAVORITE`:
      return Object.assign({}, state, {
        favoriteFilms: action.payload
      });

    case `CHOOSE_FILM`:
      return Object.assign({}, state, {
        choosenFilmId: action.payload
      });

    case `LOAD_PROMO`:
      return Object.assign({}, state, {
        promoFilm: action.payload,
      });

    case `GET_COMMENTS`:
      return Object.assign({}, state, {
        comments: action.payload,
      });

    default:
      return state;
  }
};

