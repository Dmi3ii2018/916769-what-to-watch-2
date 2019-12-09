import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {filterReducer, Operation} from "./reducer/reducer";
import {MainPage} from "./components/main/main";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from './axios/api';

const init = () => {

  const api = createAPI((...args) => store.dispatch(...args));

  const store = createStore(
      filterReducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(Operation.loadQuestions());

  ReactDOM.render(
      <Provider store={store}>
        <MainPage onHeaderClick={() => {}}/>
      </Provider>,
      document.querySelector(`#root`)
  );
};
init();
