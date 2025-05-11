import React from "react";

//* Redux
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "@redux-devtools/extension";

import rootReducer from "reducers/index";

// const store = createStore(rootReducer, {});

const Root = ({ children, initialState = {} }: { children: JSX.Element; initialState?: RootState }): JSX.Element => {
  const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(reduxPromise)));
  return (
    <React.Fragment>
      <Provider store={store}>{children}</Provider>
    </React.Fragment>
  );
};

export default Root;
