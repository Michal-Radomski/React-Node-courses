import React from "react";

export const RegularList = ({
  items,
  sourceName,
  ItemComponent,
}: {
  items: Author[] | Book[];
  sourceName: string;
  ItemComponent: ({ author, book }: { author?: Author; book?: Book }) => JSX.Element;
}): JSX.Element => {
  return (
    <React.Fragment>
      {items.map((item: Author | Book, index: number) => (
        <ItemComponent key={index} {...{ [sourceName]: item }} />
      ))}
    </React.Fragment>
  );
};
