import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  React.createElement(
    BrowserRouter,
    null,
    React.createElement(App, null)
  ),
  document.getElementById("root")
);
