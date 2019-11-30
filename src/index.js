import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {filterReducer} from "./reducer/reducer";
import {MainPage} from "./components/main/main";
// import {films} from "./moks/film";

const store = createStore(filterReducer);
const init = () => {

  ReactDOM.render(
      <Provider store={store}>
        <MainPage onHeaderClic={() => {}}/>
      </Provider>,
      document.querySelector(`#root`)
  );
};
init();
