import React from "react";

const Counter = (): JSX.Element => {
  const [count, setCount] = React.useState<number>(0);

  return (
    <React.Fragment>
      <button onClick={() => setCount((c) => c - 1)}> - </button>
      {count}
      <button onClick={() => setCount((c) => c + 1)}> + </button>
    </React.Fragment>
  );
};

export default Counter;
