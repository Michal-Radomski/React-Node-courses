import React from "react";

import "./App.scss";
import { UncontrolledForm } from "./components/uncontrolled-form";
import { ControlledForm } from "./components/controlled-form";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <UncontrolledForm />
      <ControlledForm />
    </React.Fragment>
  );
};

export default App;
