import {filterReducer} from "./film-list-reducer";
import {authorizationReducer} from "./authorization-reducer";
import {combineReducers} from "redux";

export const INITIAL_GENRE = `All genres`;

export const initialState = {
  genre: INITIAL_GENRE,
  filmsList: [],
  isAuthorizationRequired: true,
  choosenFilmId: 0,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROFILE: `LOAD_PROFILE`,
  LOAD_FAVORITE: `LOAD_FAVORITE`,
  POST_FAVORITE_MOVIES: `POST_FAVORITE_MOVIES`,
  CHOOSE_FILM: `CHOOSE_FILM`,
  GET_PROMO: `LOAD_PROMO`,
  GET_COMMENTS: `GET_COMMENTS`,
  POST_COMMENNTS: `POST_COMMENTS`,
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
  },

  chooseFilm: (id) => {
    return {
      type: ActionType.CHOOSE_FILM,
      payload: id,
    };
  },

  getPromo: (data) => {
    return {
      type: ActionType.GET_PROMO,
      payload: data,
    };
  },

  getComments: (data) => {
    return {
      type: ActionType.GET_COMMENTS,
      payload: data,
    };
  },

  postComments: (comment) => {
    return {
      type: ActionType.POST_COMMENNTS,
      payload: comment,
    };
  }
};

export const Operation = {
  loadFilms: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data));
        console.log(response);
        console.log(_getState());
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
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavorite(response.data));
        console.log(response);
      });
  },

  postFavoriteFilms: (id, isFavorite) => (dispatch, _getState, api) => {
    let newApi = api.post(`/favorite/${id}/${!isFavorite ? 1 : 0}`);
    return newApi.then((response) => {
      dispatch(ActionCreator.postFavorite(response.data));
      dispatch(Operation.loadFilms());
    });
  },

  loadPromoFilm: () => (dispatch, _getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.getPromo(response.data));
        console.log(response);
      });
  },

  loadComments: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.getComments(response.data));
        console.log(response);
        console.log(_getState());
      });
  },

  postComments: (rating, comment, id) => (dispatch, _getState, api) => {
    return api.post(`/comments/${id}`, {
      rating,
      comment,
    });
  }
};

export const rootReducer = combineReducers({filterReducer, authorizationReducer});
console.dir(rootReducer);
