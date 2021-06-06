import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";

const store = createStore(reducer, middleware);
const customHistory = createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={customHistory}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
