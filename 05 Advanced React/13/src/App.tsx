import React from "react";

import "./App.scss";
import LayersPattern from "./components/LayersPattern";
import SplitPattern from "./components/SplitPattern";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <SplitPattern />
      <LayersPattern />
    </React.Fragment>
  );
};

export default App;
