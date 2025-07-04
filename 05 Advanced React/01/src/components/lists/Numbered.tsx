import React from "react";

export const NumberedList = ({
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
        <React.Fragment key={index}>
          <h3> {index + 1} </h3>
          {/* <ItemComponent key={index} book={item} />  //* The same  */}
          <ItemComponent key={index} {...{ [sourceName]: item }} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
