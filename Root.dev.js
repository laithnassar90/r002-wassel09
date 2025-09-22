import React from "react"; // may still be needed if not using new JSX runtime
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from "../src/App";       // adjust path if needed
import store, { history } from "../src/store/configureStore"; // adjust path if needed

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

export default Root;
