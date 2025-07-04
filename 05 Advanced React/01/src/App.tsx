import React from "react";

import "./App.scss";
import SplitScreen from "./components/SplitScreen";

const LeftSideComp = ({ title }: { title: string }): JSX.Element => {
  return <h2 style={{ backgroundColor: "crimson" }}>{title}</h2>;
};

const RightSideComp = ({ title }: { title: string }): JSX.Element => {
  return <h2 style={{ backgroundColor: "burlywood" }}>{title}</h2>;
};

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <SplitScreen leftWidth={1} rightWidth={3}>
        <LeftSideComp title={"Right"} />
        <RightSideComp title={"Left"} />
      </SplitScreen>
    </React.Fragment>
  );
};

export default App;
