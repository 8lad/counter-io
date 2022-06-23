import React from "react";
import ReactDOM from "react-dom/client";
import "./fonts/courgette-v13-latin/courgette-v13-latin-regular.ttf";
import "./index.scss";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
