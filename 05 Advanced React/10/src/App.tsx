import React from "react";

import "./App.scss";
import TasksBoard from "./components/tasks-board";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <TasksBoard />
    </React.Fragment>
  );
};

export default App;
