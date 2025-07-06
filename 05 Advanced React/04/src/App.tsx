import React from "react";

import "./App.scss";
import { checkProps } from "./components/check-props";
import { UserInfo } from "./components/user-info";
import { users } from "../data";

const UserInfoWrapper = checkProps(UserInfo);

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <UserInfoWrapper user={users[0]} />
    </React.Fragment>
  );
};

export default App;
