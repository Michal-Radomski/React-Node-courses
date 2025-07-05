import React from "react";

import "./App.scss";
import { CurrentUserLoader } from "./components/current-user-loader";
import { UserInfo } from "./components/user-info";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <CurrentUserLoader>
        <UserInfo />
      </CurrentUserLoader>
    </React.Fragment>
  );
};

export default App;
