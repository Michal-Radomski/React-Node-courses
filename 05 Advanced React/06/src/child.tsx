import React from "react";

export const Child = (): JSX.Element => {
  React.useEffect(() => {
    fetch("/").then(() => {
      throw new Error("Fetch Error");
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  console.log(text);

  return (
    <React.Fragment>
      <h1>Child Component</h1>
    </React.Fragment>
  );
};
