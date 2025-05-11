import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import Welcome from "./components/Welcome";
import SignUp from "./components/auth/SignUp";
import rootReducer from "./reducers";
import Feature from "./components/Feature";
import SignOut from "./components/auth/SignOut";
import SignIn from "./components/auth/SignIn";

const store = createStore(
  rootReducer,
  {
    auth: { authenticated: localStorage.getItem("token") },
  },
  composeWithDevTools(applyMiddleware(reduxThunk))
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App>
        <React.Fragment>
          <Route path="/" exact={true} component={Welcome} />
          <Route path="/signup" component={SignUp as React.ComponentType} />
          <Route path="/feature" component={Feature} />
          <Route path="/signout" component={SignOut} />
          <Route path="/signin" component={SignIn as React.ComponentType} />
        </React.Fragment>
      </App>
    </Router>
  </Provider>
  // </React.StrictMode>
);
