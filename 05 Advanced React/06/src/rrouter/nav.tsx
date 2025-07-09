import React from "react";
import { Outlet, useNavigation } from "react-router";

import { LoadingMessage, NavContainer, NavLink } from "./styled-elements";

const Nav = (): JSX.Element => {
  const { state } = useNavigation();

  return (
    <React.Fragment>
      <NavContainer>
        <NavLink to={"/"}>Main</NavLink>
        <NavLink to={"/books"}>Books</NavLink>
        <NavLink to={"/club"}>Club</NavLink>
        {state === "loading" ? <LoadingMessage>Loading...</LoadingMessage> : null}
      </NavContainer>
      <React.Suspense fallback={<NavContainer>Loading...</NavContainer>}>
        <NavContainer>
          <Outlet />
        </NavContainer>
      </React.Suspense>
    </React.Fragment>
  );
};

export default Nav;
