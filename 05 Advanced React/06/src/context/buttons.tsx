import React from "react";

import { useDispatchContext } from "./cart-context";

const Buttons = (): JSX.Element => {
  const dispatch = useDispatchContext();

  return (
    <React.Fragment>
      <div className="buttons">
        <button className="button" onClick={() => dispatch({ type: "DECREMENT" })}>
          ➖
        </button>
        <button className="button" onClick={() => dispatch({ type: "INCREMENT" })}>
          ➕
        </button>
      </div>
    </React.Fragment>
  );
};

export default Buttons;
