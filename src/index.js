import React from "react";
import ReactDOM from "react-dom";
import {MainPage} from "./components/main/main";

const init = () => {
  const data = {
    filmNames: [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`],
  };

  ReactDOM.render(
      <MainPage
        filmNames = {data.filmNames}
      />,
      document.querySelector(`#root`)
  );
};
init();
