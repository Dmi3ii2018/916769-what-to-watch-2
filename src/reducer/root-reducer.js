import {filterReducer} from "./film-list-reducer";
import {authorizationReducer} from "./authorization-reducer";
import {combineReducers} from "redux";

export const INITIAL_GENRE = `All genres`;

export const initialState = {
  genre: INITIAL_GENRE,
  filmsList: [],
  isAuthorizationRequired: true,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROFILE: `LOAD_PROFILE`,
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

  loadProfile: (data) => {
    return {
      type: ActionType.LOAD_PROFILE,
      payload: data,
    };
  }
};

export const Operation = {
  loadFilms: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data));
        console.log(response);
      });
  },

  getAuthorization: (data) => (dispatch, _getState, api) => {
    return api.post(`/login`, {
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        dispatch(ActionCreator.loadProfile(response.data));
        console.log(response);
      })
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(false));
        console.log(_getState());
      });
  }
};

export const rootReducer = combineReducers({filterReducer, authorizationReducer});
console.dir(rootReducer);
