import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {rootReducer, Operation} from "./reducer/root-reducer";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from './axios/api';
import {App} from "./components/app/app";
import {BrowserRouter} from "react-router-dom";

import withScreenSwitch from "./HoC/with-switch-screen";

const AppWrapped = withScreenSwitch(App);

const init = () => {

  const api = createAPI((...args) => store.dispatch(...args));

  const store = createStore(
      rootReducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );
  store.dispatch(Operation.loadPromoFilm())
    .then(() => {
      store.dispatch(Operation.loadFilms());
    })
    .then(() => {
      ReactDOM.render(
          <Provider store={store}>
            <BrowserRouter>
              <AppWrapped />
            </BrowserRouter>
          </Provider>,
          document.querySelector(`#root`)
      );
    });

};
init();

