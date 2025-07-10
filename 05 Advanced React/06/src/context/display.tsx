import React from "react";

import { useStateContext } from "./cart-context";

const Display = (): JSX.Element => {
  const { count } = useStateContext();

  return (
    <React.Fragment>
      <span className="span">{count}</span>
    </React.Fragment>
  );
};

export default Display;
