import React from "react";

export const SmallAuthorListItem = ({ author }: { author?: Author }): JSX.Element => {
  const { name, age } = author as Author;

  return (
    <React.Fragment>
      <p>
        Name: {name}, Age: {age}
      </p>
    </React.Fragment>
  );
};
