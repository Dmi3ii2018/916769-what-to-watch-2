// import {films} from "../moks/film";

export const INITIAL_GENRE = `All genres`;

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOAD_FILMS: `LOAD_FILMS`,
};

const initialState = {
  genre: INITIAL_GENRE,
  // filter: {
  //   genre: INITIAL_GENRE,
  // }
  filmsList: [],
};

export const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  loadFilms: (films) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: films,
    };
  },
};

export const Operation = {
  loadFilms: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data));
        console.log(response);
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
        filmsList: action.payload
      });

    default:
      return state;
  }
};

