import React from "react";

interface ObjectI {
  [key: string]: string | ObjectI;
}

const isValidObj = (data: ObjectI | string) => typeof data === "object" && data !== null;

export const Recursive = ({ data }: { data: ObjectI | string }): JSX.Element => {
  if (!isValidObj(data)) {
    return <li>{data}</li>;
  }

  const pairs = Object.entries(data);
  console.log("data:", data);

  return (
    <React.Fragment>
      {pairs.map(([key, value], index) => {
        return (
          <li key={index}>
            {key}:
            <ul>
              <Recursive data={value as string} />
            </ul>
          </li>
        );
      })}
    </React.Fragment>
  );
};
