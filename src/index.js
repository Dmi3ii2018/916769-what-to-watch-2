import React from "react";
import ReactDOM from "react-dom";
import {MainPage} from "./components/main/main";

const init = () => {
  const data = {
    filmNames: [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Avengers`],
  };

  ReactDOM.render(
      <MainPage
        filmNames = {data.filmNames}
        onHeaderClick = {() => ``}
      />,
      document.querySelector(`#root`)
  );
};
init();
