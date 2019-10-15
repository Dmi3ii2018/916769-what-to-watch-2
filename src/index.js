import React from "react";
import ReactDOM from "react-dom";
import {MainPage} from "../src/components/main.js";

const init = () => {
  ReactDOM.render(
      <MainPage />,
      document.querySelector(`#root`)
  );
};
init();
