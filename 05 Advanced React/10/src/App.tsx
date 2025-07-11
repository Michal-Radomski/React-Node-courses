import React from "react";
import styled from "styled-components";

import "./App.scss";
import TasksBoard from "./components/tasks-board";
import ShoppingList from "./components/shopping-list";

const StyledApp = styled.div`
  margin: 0 auto;
  max-width: 6xl;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-left: 25px;
  padding-right: 25px;
`;

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <StyledApp>
        <ShoppingList />
      </StyledApp>

      <TasksBoard />
    </React.Fragment>
  );
};

export default App;
