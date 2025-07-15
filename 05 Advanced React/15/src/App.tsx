import React from "react";

import "./App.scss";
import withMouseMove from "./components/hoc/withPosition";
import { DisplayMousePosition } from "./components/hoc/displayMousePosition";
// import MousePosition from "./components/position";

const App = (): JSX.Element => {
  const Wrapper = withMouseMove(DisplayMousePosition);
  return (
    <React.Fragment>
      <div className="container">
        {/* <MousePosition /> */}
        <Wrapper />
      </div>
    </React.Fragment>
  );
};

export default App;
