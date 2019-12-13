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
  LOAD_FAVORITE: `LOAD_FAVORITE`,
  POST_FAVORITE_MOVIES: `POST_FAVORITE_MOVIES`,
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
  },

  loadFavorite: (data) => {
    return {
      type: ActionType.LOAD_FAVORITE,
      payload: data,
    };
  },

  postFavorite: (data) => {
    return {
      type: ActionType.LOAD_FAVORITE,
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
  },

  loadFavoriteFilms: () => (dispatch, _getState, api) => {
    return api .get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavorite(response.data));
        console.log(response);
      });
  },

  postFavoriteFilms: (id, isFavorite) => (dispatch, _getState, api) => {
    return api .post(`/favorite/: ${id}/: ${isFavorite}`)
      .then((response) => {
        dispatch(ActionCreator.postFavorite(response.data));
        console.log(response);
      });
  }
};

export const rootReducer = combineReducers({filterReducer, authorizationReducer});
console.dir(rootReducer);
