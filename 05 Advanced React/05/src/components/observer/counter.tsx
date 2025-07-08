import React from "react";

import { emitter } from "./emitter";

const Counter = (): JSX.Element => {
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    const onIncrement = (): void => {
      setCount((count) => count + 1);
    };
    const onDecrement = (): void => {
      setCount((count) => count - 1);
    };

    emitter.on("increment", onIncrement);
    emitter.on("decrement", onDecrement);
    return () => {
      emitter.off("increment", onIncrement);
      emitter.off("decrement", onDecrement);
    };
  }, []);

  return (
    <React.Fragment>
      <div>#: {count}</div>
    </React.Fragment>
  );
};

export default Counter;
