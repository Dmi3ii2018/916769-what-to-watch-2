import React from "react";
import ReactDOM from "react-dom";
import {MainPage} from "./components/main/main";
import {films} from "./moks/film";

const init = () => {

  ReactDOM.render(
      <MainPage
        // filmNames = {data.filmNames}
        onHeaderClick = {() => ``}
        filmData = {films}
      />,
      document.querySelector(`#root`)
  );
};
init();
