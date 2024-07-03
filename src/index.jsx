import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./app";
import { BASE_PATH } from "./variables";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter basename={BASE_PATH}>
      <App />
    </BrowserRouter>
  </Provider>
);
