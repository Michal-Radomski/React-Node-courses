import React from "react";

import Buttons from "./buttons";
import Counter from "./counter";

const ParentComponent = (): JSX.Element => {
  return (
    <React.Fragment>
      <Buttons />
      <Counter />
    </React.Fragment>
  );
};

export default ParentComponent;
