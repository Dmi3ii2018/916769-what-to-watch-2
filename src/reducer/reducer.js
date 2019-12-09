import {films} from "../moks/film";

const INITIAL_GENRE = `All genres`;

const initialState = {
  genre: INITIAL_GENRE,
  // filter: {
  //   genre: INITIAL_GENRE,
  // }
  filmsList: films,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOAD_FILMS: `LOAD_FILMS`,
};


export const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  loadFilms: (film) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: film,
    };
  },
};

export const Operation = {
  loadQuestions: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data));
      });
  },
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case `SET_FILTER`:
      return Object.assign({}, state, {
        genre: action.genre,
      });

    case `LOAD_FILMS`:
      return Object.assign({}, state, {
        filmsList: action.films
      });

    default:
      return state;
  }
};

