import React from "react";

import { emitter } from "./emitter";

const Buttons = (): JSX.Element => {
  const onIncrementCounter = (): void => {
    emitter.emit("increment");
  };

  const onDecrementCounter = (): void => {
    emitter.emit("decrement");
  };

  return (
    <React.Fragment>
      <div>
        <button onClick={onIncrementCounter}>➕</button>
        <button onClick={onDecrementCounter}>➖</button>
      </div>
    </React.Fragment>
  );
};

export default Buttons;
