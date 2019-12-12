import {initialState} from "./root-reducer";

export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case `REQUIRED_AUTHORIZATION`:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });

    case `LOAD_PROFILE`:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};
