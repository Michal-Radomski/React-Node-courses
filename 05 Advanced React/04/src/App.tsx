import React from "react";

import "./App.scss";
import { checkProps } from "./components/check-props";
import { UserInfo } from "./components/user-info";
import { users } from "../data";
import { includeUser } from "./components/include-user";
import { includeUpdatableUser } from "./components/include-updatable-user";

const UserInfoWrapper = checkProps(UserInfo);
const UserInfoWithUser = includeUser(UserInfo, "2");
const UserInfoWithUser2 = includeUpdatableUser(UserInfo, "3");

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <UserInfoWithUser2 />
      <br />
      <UserInfoWithUser />
      <br />
      <UserInfoWrapper user={users[0]} />
    </React.Fragment>
  );
};

export default App;
